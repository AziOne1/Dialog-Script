package ru.cristalix.rise.client_speaking.npc;

import java.util.List;

public class Button {

    public String text;
    public List<ru.cristalix.rise.client_speaking.npc.Action> actions = null;

    public Button withText(String text) {
        this.text = text;
        return this;
    }

    public Button withActions(List<ru.cristalix.rise.client_speaking.npc.Action> actions) {
        this.actions = actions;
        return this;
    }

}