package ru.cristalix.rise.client_speaking.npc;


public class Action {

    public String type;
    public Screen screen;
    public String command;

    public Action withType(String type) {
        this.type = type;
        return this;
    }

    public Action withScreen(Screen screen) {
        this.screen = screen;
        return this;
    }

    public Action withCommand(String command) {
        this.command = command;
        return this;
    }

}