package ru.cristalix.rise.client_speaking.npc;

import java.util.List;

public class Screen {

    public List<String> text = null;
    public List<Button> buttons = null;

    public Screen withText(List<String> text) {
        this.text = text;
        return this;
    }

    public Screen withButtons(List<Button> buttons) {
        this.buttons = buttons;
        return this;
    }

}