package ru.cristalix.rise.client_speaking.npc;


public class Entrypoint {

    public String id;
    public String title;
    public String subtitle;
    public Screen screen;

    public Entrypoint withId(String id) {
        this.id = id;
        return this;
    }

    public Entrypoint withTitle(String title) {
        this.title = title;
        return this;
    }

    public Entrypoint withSubtitle(String subtitle) {
        this.subtitle = subtitle;
        return this;
    }

    public Entrypoint withScreen(Screen screen) {
        this.screen = screen;
        return this;
    }

}