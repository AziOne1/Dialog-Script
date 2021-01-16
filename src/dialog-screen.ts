import * as gui from "@cristalix/client-api";
import * as easing from "@cristalix/client-api/lib/easing";

(function (plugin: any) {

    let picked_item = -1;

    function log(message: string) {
        stdout.println(message);
    }

    interface Action {

        type: string;

        do(): void;

    }

    class OpenScreenAction implements Action {

        type = "open_screen";
        screen: Screen;

        constructor(screen: Screen) {
            this.screen = screen;
        }

        public do(): void {
            openScreen(this.screen);
        }

        public static parse(json: any): OpenScreenAction {
            let screenJson = json.screen;
            if (!screenJson) {
                log("Action's screen is not set!")
                return null;
            }

            let screen = parseScreen(screenJson);
            if (!screen) {
                log("Action's screen is not correct!")
                return null;
            }
            return new OpenScreenAction(screen);
        }

    }

    class CommandAction implements Action {

        type = "command_action";
        command: string;

        constructor(command: string) {
            this.command = command;
        }


        public do(): void {
            ChatExtensions.sendChatMessage(this.command);
        }

        public static parse(json: any): CommandAction {
            let command = json.command;
            if (!command) {
                log("Action's command is not set!");
                return null;
            }
            return new CommandAction(command); // TODO
        }

    }

    class PreviousScreen implements Action {

        type = "previous_screen";

        public do(): void {
            previousScreen();
        }

    }

    class CloseAction implements Action {

        type = "close";

        public do(): void {
            close(entrypoint);
        }

    }

    class Button {

        text: string;
        actions: Action[];

        constructor(text: string, actions: Action[]) {
            this.text = text;
            this.actions = actions;
        }

    }

    class Screen {

        text: string[];
        buttons: Button[];

        constructor(text: string[], buttons: Button[]) {
            this.text = text;
            this.buttons = buttons;
        }

    }

    class Entrypoint {

        id: string
        title: string;
        subtitle: string; // May be undefined
        screen: Screen;

        constructor(id: string, title: string, subtitle: string, screen: Screen) {
            this.id = id;
            this.title = title;
            this.subtitle = subtitle;
            this.screen = screen;
        }

    }

    function parseEntrypoint(json: any): Entrypoint {
        let id = json.id;
        if (!id) {
            log("\"id\" field of entrypoint is not set!");
            return null;
        }

        let title = json.title;
        if (!title) {
            log("\"title\" field of " + id + " entrypoint is not set!");
            return null;
        }
        let subtitle = json.subtitle;

        let screenJson = json.screen;
        if (!screenJson) {
            log("\"screen\" field of " + id + " entrypoint is not set!");
            return null;
        }

        let screen = parseScreen(screenJson);
        if (!screenJson) {
            log("Screen data of " + id + " entrypoint is not correct!");
            return null;
        }

        return new Entrypoint(id, title, subtitle, screen);
    }

    function parseScreen(json: any): Screen {
        let text = json.text;
        if (!text) {
            log("\"text\" field of the screen is not set!");
            return null;;
        }

        let buttonsArray = json.buttons;
        if (!buttonsArray) {
            log("\"buttons\" field of the screen is not set!");
            return null;
        }

        let buttons: Button[] = [];
        for (let buttonJson of buttonsArray) {
            let button = parseButton(buttonJson);
            if (button) {
                buttons.push(button);
            }
        }
        if (buttons.length == 0) {
            log("No one correct button data in the screen's json!");
            return null;
        }

        return new Screen(text, buttons);
    }

    function parseButton(json: any): Button {
        let text = json.text;
        if (!text) {
            log("\"text\" field of the button is not set!");
            return null;;
        }

        let actionsArray = json.actions;
        if (!actionsArray) {
            log("\"actions\" field of the button is not set!");
            return null;
        }

        let actions: Action[] = [];
        for (let actionJson of actionsArray) {
            let type = actionJson.type;
            let action: Action;
            switch (type) {
                case "open_screen": {
                    action = OpenScreenAction.parse(actionJson);
                    break;
                }

                case "command": {
                    action = CommandAction.parse(actionJson);
                    break;
                }

                case "previous_screen": {
                    action = new PreviousScreen();
                    break;
                }

                case "close": {
                    action = new CloseAction();
                    break;
                }

                default: {
                    log("Unknown action type: " + type)
                    break;
                }
            }

            if (!action) {
                log("Action of the button is not correct!");
                return null;
            }
            actions.push(action);
        }

        return new Button(text, actions);
    }

    const TEST_ENTRYPOINT = new Entrypoint(
        "test",
        "§6Тайлт",
        "Сабтайтл",
        new Screen(
            [
                "§6~~~ §fЭто первый экран §6~~~",
                "Тыкай на кнопки, пока §6тыкалка есть §f㬂",
                "§aА ещё у нас есть вкусное печенье!"
            ],
            [
                new Button("§6G §f| Команда /help", [new CommandAction("help")]),
                new Button("§6Y §f| 㨺 Открыть другое меню", [new OpenScreenAction(
                    new Screen(
                        ["Тут всего одна строка текста 㬗"],
                        [new Button("§6G §f| Закрыть меню", [new CloseAction()])]
                    ))]),
                new Button("§6Z §f| 䂄 Закрыть", [new CloseAction()])
            ]
        )
    );

    let entrypoints: Entrypoint[] = [];

    let visible: boolean = false;
    let entrypoint: Entrypoint;
    let screen: Screen;
    let history: Screen[];

    let yMargin = 2.34;
    let windowWidth;
    let windowHeight;

    PluginMessages.on(plugin, 'dialog-screen', function (buffer: ByteBuf) {
        let action = UtilNetty.readString(buffer, 16);
        switch (action.toLowerCase()) {
            case "load": {
                let raw = UtilNetty.readString(buffer, 16384);
                let json = JSON.parse(raw);

                let update: Entrypoint[] = []
                if (json.entrypoints != undefined) {
                    for (let entrypointJson of json.entrypoints) {
                        let entrypoint = parseEntrypoint(entrypointJson);
                        let id = entrypointJson.id;
                        if (!entrypoint) {
                            if (id) {
                                log("Entrypoint " + id + " is not correct!")
                            } else {
                                log("Entrypoint without id is not correct!")
                            }
                            continue;
                        }
                        update.push(entrypoint);
                    }
                }
                entrypoints = update;
                break;
            }

            case "open": {
                let id = UtilNetty.readString(buffer, 64);
                log("Opening " + id + " entrypoint..");

                let success = false;
                for (let entrypoint of entrypoints) {
                    if (entrypoint.id == id) {
                        success = true;
                        openEntrypoint(entrypoint);
                    }
                }

                if (!success) {
                    log("Entrypoint " + id + " is not exists!");
                }
                break;
            }

            case "close": {
                let id = UtilNetty.readString(buffer, 64);
                log("Closing " + id + " entrypoint..");

                let success = false;
                for (let entrypoint of entrypoints) {
                    if (entrypoint.id == id) {
                        success = true;
                        close(entrypoint);
                    }
                }

                if (!success) {
                    log("Entrypoint " + id + " is not exists!");
                }
                break;
            }

            default: {
                log("Unknown action: " + action);
                break;
            }
        }
    });

    Events.on(plugin, "key_press", (event: KeyPressEvent) => {
        for (let i in buttonHotkeys) {
            if (event.key == buttonHotkeys[i]) {
                activateButton(screen.buttons[i]);
                log(screen.buttons[i] + ' ' + i);
                return;
            }
        }
        switch (event.key) {
            case Keyboard.KEY_UP: { shiftButtonCursor(+1); break; };
            case Keyboard.KEY_DOWN: { shiftButtonCursor(-1); break; };
            case Keyboard.KEY_RETURN: { pressEnter(); break; }
        }
    });

    let dialogRunning = false;

    function pressEnter() {
        if (dialogRunning) {
            dialogRunning = false;
            NpcPart.rotationZ.transit(0, -1, easing.none);
            for (let child of npc_dialog.children) {
                child.rotationZ.transit(0, -1, easing.none);
                child.scale.value = 1;
            }
            ButtonPart.alignX.transit(0.5, 300, easing.outCubic);
            buttonCursor.x.transit(-10, 100, easing.none);
            buttonsBG.x.transit(-10,100, easing.none);
            return;
        }
        activateButton(screen.buttons[picked_item]);
    }
    let maxWiddth = 0;
    function getMaxStringWidrh(): int{
        let buttonInd = 0;
        
        let width = 0;
        for (let buttons1 of buttons.children){
            width = fontRenderer.getStringWidth(buttonMessage(screen.buttons[buttonInd].text, buttonInd));
            if(width > maxWiddth) maxWiddth = width;
            buttonInd++;
        }
        return maxWiddth;
    }

    function shiftButtonCursor(delta: number) {
        picked_item += delta;
        if (picked_item < 0) picked_item = screen.buttons.length - 1;
        if (picked_item >= screen.buttons.length) picked_item = 0;

        let buttonIndex = 0;
        for (let button of screen.buttons) {
            (buttons.children[buttonIndex] as gui.Text).text = buttonMessage(button.text, buttonIndex);
            (buttons.children[buttonIndex] as gui.Text).x.value = 0;
            (buttons.children[buttonIndex] as gui.Text).x.value = (maxWiddth - fontRenderer.getStringWidth(buttonMessage(screen.buttons[buttonIndex].text, buttonIndex)))/2 + 0.2;
            buttonsBG.children[buttonIndex].enabled = true;
            buttonIndex++;
        }

        buttonCursor.y.transit(picked_item * buttonHeight + 5*picked_item, 300, easing.outCubic);
        
        buttonsBG.children[picked_item].enabled = false;
        buttonCursor.width.value = maxWiddth+19;
        

    }

    let buttons = gui.rect({});

    let buttonCursor = gui.rect({
        z:-9,
        height: 15,
        x:1,
        color: { a: 1, r: 42 / 255, g: 102 / 255, b: 189 / 255 },
    });
    let buttonsBG = gui.rect({
        x: 1,
        z:-10,
    });

    //Кусок экрана с кнопками
    let ButtonPart = gui.rect({
        z: -10,
        align: gui.RIGHT,
        children: [buttonCursor, buttonsBG, buttons],
    });
    //имя нпс
    let npc_title = gui.text({
        z: -9,
        //text: npc_name,
        origin: gui.TOP,
        align: gui.TOP,
        scale: 1.4,
        color: { a: 1, r: 255 / 255, g: 195 / 255, b: 0 },
        y: yMargin * 3
    });
    //подимя нпс
    let npc_subtitle = gui.text({
        z: -9,
        //text: npc_description,
        origin: gui.TOP,
        align: gui.TOP,
        scale: 0.9,
        color: { a: 1, r: 213 / 255, g: 202 / 255, b: 141 / 255 },
        y: yMargin * 9
    });

    let npc_dialog = gui.rect({
        origin: gui.TOP_LEFT,
        align: gui.TOP_LEFT,
        y: 32,
    });


    //Кусок экрана с нпс и текстом к нему
    let NpcPart = gui.rect({
        z: -9,
        width: windowWidth,
        height: 55,
        color: { a: 0.62, r: 0, g: 0, b: 0 },
        y: 10,
        origin: gui.BOTTOM,
        align: gui.BOTTOM,
        children: [npc_title, npc_subtitle, npc_dialog]
    });

    //Забираем общуюю нужню часть
    let DialogBG = gui.rect({
        width: windowWidth,
        height: 0.33,
        color: { a: 0, r: 0, g: 0, b: 0 },
        enabled: visible,
        origin: gui.BOTTOM,
        align: gui.BOTTOM,
        children: [ButtonPart, NpcPart]
    })

    gui.overlay.push(DialogBG);
    let buttonHeight = 15;
    let buttonHotkeyNames = ['G', 'Y', 'Z', 'X'];
    let buttonHotkeys = [Keyboard.KEY_G, Keyboard.KEY_Y, Keyboard.KEY_Z, Keyboard.KEY_X];

    function buttonMessage(message: string, index: number): string {
        let picked = index == picked_item;
        return buttonHotkeyNames[index] + '§f | ' + message;
    }
    function buttonPickedMessage(message: string, index: number): string {
        let picked = true;
        return (picked ? '> ' : '') + buttonHotkeyNames[index] + '§f | ' + message;
    }

    function update() {
        windowWidth = minecraft.getResolution().getScaledWidth();
        windowHeight = minecraft.getResolution().getScaledHeight();
        npc_dialog.width.value = windowWidth;
        NpcPart.width.value = windowWidth;

        DialogBG.width.value = windowWidth;
        DialogBG.height.value = windowHeight;


        DialogBG.enabled = visible;
        if (entrypoint && screen) {

            npc_dialog.children = [];

            let index = 0;
            let wordDelay = 0;
            let partLength = 0;
            let totalPartDelay = 0;
            let delay = 0;

            for (let line of screen.text) {
                let split = line.split(' ');
                let str = "";
                while (split.length) {
                    let width = 0;
                    let children: gui.Text[] = [];
                    while (width < windowWidth*0.8) {
                        if (!split.length) break;
                        if (str) str += ' ';
                        let word = split.shift();
                        children.push(gui.text({
                            text: word,
                            x: fontRenderer.getStringWidth(str) + fontRenderer.getStringWidth(word) / 2,
                            y: index * 10,
                            origin: gui.TOP,
                            align: gui.TOP
                        }))
                        str += word;
                        width = fontRenderer.getStringWidth(str);
                    }
                    str ="";
                    index++;
                    for (let child of children) {
                        npc_dialog.children.push(child);
                        child.x.value -= width / 2;
                        child.scale.value = 0.0001;
                        wordDelay++;
                        partLength += child.text.length;
                        delay = 60 * wordDelay + totalPartDelay * 40;
                        child.rotationZ.transit(0, delay, easing.none, () => {
                            child.scale.value = 1;
                        });
                        if (child.text.match(/[,\.?!]/)) {
                            totalPartDelay += partLength;
                            partLength = 0;
                        }
                    }
                }
            }

            dialogRunning = true;

            NpcPart.rotationZ.transit(0, delay, easing.none, () => {
                pressEnter();
            })
            let NpcParHeight = 0;
            NpcPart.height.transit(index * 10 + 64, 300, easing.outCubic);
            log(windowHeight.toString());
            NpcParHeight = index * 10 + 64;
            npc_title.text = entrypoint.title;
            if (entrypoint.subtitle) npc_subtitle.text = entrypoint.subtitle;



            buttons.children = [];
            buttonsBG.children = [];
            let buttonIndex = 0;

            for (let button of screen.buttons) {
                let buttonText = gui.text({
                        align: gui.CENTER,
                        text: buttonMessage(button.text, buttonIndex),
                        y: buttonHeight * buttonIndex + 3 + 5*buttonIndex,
                    });
                buttons.children.push(buttonText);

                let bg = gui.rect({
                    z: -99,
                    height: 15,
                    align: gui.CENTER,
                    y: buttonHeight * buttonIndex + 3+ 5*buttonIndex,
                    color: { a: 100/255, r: 0, g: 0, b: 0 },
                });
                bg.y.transit(buttonIndex * buttonHeight + 5*buttonIndex, 300, easing.outCubic);
                //bg.width.value = fontRenderer.getStringWidth(buttonPickedMessage((buttons.children[buttonIndex] as gui.Text).text, buttonIndex)) + 2 ;
                bg.width.value = getMaxStringWidrh() + 19;
                //log(getMaxStringWidrh().toString());
                buttonsBG.children.push(bg);

                buttonIndex++;
            }
            ButtonPart.y.value = - buttonIndex * buttonHeight + 0.25*(windowHeight-NpcParHeight);
            shiftButtonCursor(0);


        } else {

        }
    }


    Events.on(plugin, 'hotbar_render', (e: CancellableRenderEvent) => e.cancelled = visible);
    Events.on(plugin, 'hunger_render', (e: CancellableRenderEvent) => e.cancelled = visible);
    Events.on(plugin, 'exp_render', (e: CancellableRenderEvent) => e.cancelled = visible);
    Events.on(plugin, 'armor_render', (e: CancellableRenderEvent) => e.cancelled = visible);
    Events.on(plugin, 'health_render', (e: CancellableRenderEvent) => e.cancelled = visible);

    function activateButton(button: Button) {
        if (button) {
            for (let action of button.actions) {
                action.do();
            }
        }
    }

    function openEntrypoint(target: Entrypoint) {
        maxWiddth = 0;
        entrypoint = target;
        screen = target.screen;
        visible = true;
        history = [];
        picked_item = 0;
        update();
    }

    function openScreen(target: Screen) {
        maxWiddth = 0;
        history.push(screen);
        screen = target;
        visible = true;
        picked_item = 0;
        update();
    }

    function previousScreen() {
        let screen = history.pop();
        openScreen(screen);
    }

    function close(target: Entrypoint) {
        ButtonPart.alignX.value=0;
        buttonCursor.x.value = 1;
        buttonsBG.x.value = 1;
        entrypoint = target;
        target.screen = undefined;
        if (!target.screen) visible = false;
        picked_item = -1;
        NpcPart.height.value = 0;
        ButtonPart.alignX.value = 1;
        update();
    }

})(plugin);