package ru.cristalix.rise.client_speaking.npc;

import java.util.List;

public class Dialog {

    public List<Entrypoint> entrypoints = null;

    public Dialog withEntrypoints(List<Entrypoint> entrypoints) {
        this.entrypoints = entrypoints;
        return this;
    }

}