"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { t } from "@/lib/t";

const EMBED_URL = "https://proxy.n8nchatui.com/api/embed/4ozbsB";

function clearChatCache() {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k) continue;

      if (
        k === "chatSessionId" ||
        k.toLowerCase().includes("n8n") ||
        k.toLowerCase().includes("chat") ||
        k.toLowerCase().includes("widget")
      ) {
        keysToRemove.push(k);
      }
    }

    keysToRemove.forEach((k) => localStorage.removeItem(k));

    localStorage.setItem("chatSessionId", crypto.randomUUID());
  } catch (e) {
    console.log("clearChatCache error:", e);
  }
}

function destroyWidgetDom() {
  try {
    const nodes = document.querySelectorAll(
      ".n8n-chat-ui-bot-container, .n8n-chat-ui-container, [data-n8n-chat-ui]"
    );
    nodes.forEach((n) => n.remove());
  } catch (e) {
    console.log("destroyWidgetDom error:", e);
  }
}

export default function ChatPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const cw = t(locale, "chatWidget");

  const theme = useMemo(() => {
    return {
      chatWindow: {
        ...(cw?.ui || {}),
        title: cw?.title || "AI агент MindSpark",
        titleAvatarSrc: cw?.titleAvatarSrc || "",
        welcomeMessage: cw?.welcomeMessage || "",
        errorMessage: cw?.errorMessage || "",
        starterPrompts: Array.isArray(cw?.starterPrompts) ? cw.starterPrompts : [],
      },
    };
  }, [cw]);

  useEffect(() => {
    clearChatCache();
    destroyWidgetDom();

    window.myChatCallbacks = {
      onWidgetOpen: function () {
        if (window.innerWidth <= 768) {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          document.body.style.position = "fixed";
          document.body.style.top = "-" + scrollY + "px";
          document.body.style.left = "0";
          document.body.style.right = "0";
          document.body.dataset.scrollLock = String(scrollY);

          function preventTouchMove(e) {
            const widgetEl = document.querySelector(".n8n-chat-ui-bot-container");
            if (widgetEl && !widgetEl.contains(e.target)) e.preventDefault();
          }
          document._preventTouchMove = preventTouchMove;
          document.addEventListener("touchmove", preventTouchMove, { passive: false });
        }
      },

      onWidgetClose: function () {
        if (window.innerWidth <= 768) {
          const scrollY = parseInt(document.body.dataset.scrollLock || "0", 10);
          document.removeEventListener("touchmove", document._preventTouchMove, {
            passive: false,
          });

          document.body.style.position = "";
          document.body.style.top = "";
          document.body.style.left = "";
          document.body.style.right = "";
          delete document.body.dataset.scrollLock;

          window.scrollTo(0, scrollY);
        }
      },

      beforeSubmit: function (data) {
        data.metadata = data.metadata || {};
        data.metadata.locale = locale;
        return data;
      },

      onError: function (data) {
        console.log("Widget error:", data);
      },

      onChatClear: function () {
        localStorage.setItem("chatSessionId", crypto.randomUUID());
      },
    };

    (async () => {
      const mod = await import(/* webpackIgnore: true */ EMBED_URL);
      const n8nChatUiWidget = mod?.default || mod;

      n8nChatUiWidget.load({
        callbackRegistry: "myChatCallbacks",
        theme,
        metadata: { locale },
      });
    })();
  }, [locale, theme]);

  return null;
}
