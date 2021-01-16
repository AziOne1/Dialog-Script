# Dialog Script v1
 Just latest source and build of Dialogs Script for cristalix

# Команды
Скрипт принимает в себя 3 типа команд
1. load <json>
Через данную команду вы передаёте Json файл, структура и возможности которого будут описаны ниже
2. open <entrypoint_id>
Данная команда открывает точку входа с указанным id, используется строого после команды 1
3. close <entrypoint_id>
Закрывает точку входа по id (Можно сделать закрытие диалога  если игрок отошёл от нужной вам точки)

# Json
В json файле имеется возможность передачи сразу нескольких точек входа, поэтому вы можете сами выбрать момент для отправки.


Пример 1.
```{
    "entrypoints": [
        {
            "id": "newYear",
            "title": "§6Лина",
            "screen": {
                "text": ["str"]
            }
        }
    ]
}```
В данном случае мы передаём одну точку входа с id newYear, названием Лина, а при выполнении функции open у нас появится экран со сторокой str

Теперь мы будем постепенно усложнять пример 1. Для начала добавим кнопки.

# Кнопки
Кнопки имеют определённый ряд возможностей, называемых далее Actions, который определяется их типом("type"), во все кнопки можно передавать сразу несколько Action'ов
1. open_screen
Открывает screen, который вы передадите кнопке
2. close
Закрывает диалог
3. command
Отправляет переданный текст в чат (можно отправить /hub и будет выполнена команда)

Пример 2.
```{
    "entrypoints": [
        {
            "id": "newYear",
            "title": "§6Лина",
            "screen": {
                "text": ["str"],
                "buttons": [
                    {
                        "text": "Сколько подарков я нашёл?",
                        "actions": [
                            {
                                "type": "open_screen",
                                "screen": {
                                    "text": ["Количество найденных тобою подарков равно 10"],
                                    "buttons": [
                                        { "text": "Спасибо, пока", "actions": [{ "type": "close" }] }
                                    ]
                                }
                            }
                        ]
						
						
						                    {
                        "text": "Хочу получить новое задание",
                        "actions": [
                            { "type": "open_screen", "screen": { "text": ["Держи, ключ, квартира отмечена на карте, зашёл, забрал, ушёл, всё просто."], "buttons": [{ "text": "До встречи", "actions": [{ "type": "close" }] }] } },
                            { "type": "command", "command": "/..." }
                        ]
                    }
						
						
                    }
                ]
            }
        }
    ]
}```

Ещё в репозитории находится java-builder, добавив который в проект вы сможете собрать json в коде
Пример 3
```java
Dialog ny = new Dialog()
        .withEntrypoints(Arrays.asList(new Entrypoint()
                .withId("newYear")
                .withTitle("Лина")
                .withScreen(new Screen().withText(Collections.singletonList(str))
                        .withButtons(Arrays.asList(
                            new Button().withText("Сколько подарков я нашёл?")
                                    .withActions(Arrays.asList(new ru.cristalix.rise.client_speaking.npc.Action()
                                            .withType("open_screen")
                                            .withScreen(new Screen().withText(Collections.singletonList("Количество найденных тобою подарков равно " + set.size()))
                                                    .withButtons(Arrays.asList(new Button().withText("Спасибо, пока!")
                                                            .withActions(Arrays.asList(new ru.cristalix.rise.client_speaking.npc.Action()
                                                                    .withType("close")))))))),
                            new Button().withText("Хочу получить шапку").withActions(Arrays.asList(
                                    new ru.cristalix.rise.client_speaking.npc.Action()
                                            .withType("open_screen")
                                            .withScreen(new Screen()
                                                    .withText(Arrays.asList(isGiftsCollected ? "Спасибо, что собрал все подарки, вот твоя шапка": "Ты собрал не все подарки!"))
                                                    .withButtons(Arrays.asList(new Button().withText("До встречи")
                                                            .withActions(Arrays.asList(new ru.cristalix.rise.client_speaking.npc.Action().withType("command").withCommand("/getnyhat"), new ru.cristalix.rise.client_speaking.npc.Action().withType("close")))))))))))));
new ClientTunnel().string("load").json(ny).sendPacket("dialog-screen", (CraftPlayer) pl);
new ClientTunnel().string("open").string("newYear").sendPacket("dialog-screen", (CraftPlayer) pl);
```