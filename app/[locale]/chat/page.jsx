"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { messages } from "@/lib/messages";

export default function ChatWidget() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  const chat = messages?.[locale]?.chat || messages.ua.chat;

  const WEBHOOK_URL =
    "https://n8ndevserver.online/webhook/5a5dfc76-c593-4f75-a40a-f419f1ad143d";

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [lockedScrollY, setLockedScrollY] = useState(0);

  const messagesRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  const [sessionId, setSessionId] = useState("ssr");

  useEffect(() => {
    if (typeof window === "undefined") return;
    let id = localStorage.getItem("chatSessionId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("chatSessionId", id);
    }
    setSessionId(id);
  }, []);

  const isMobile = () =>
    typeof window !== "undefined" && window.innerWidth <= 768;

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      const el = messagesRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  };

  const lockPageScroll = () => {
    if (!isMobile()) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    setLockedScrollY(y);
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockPageScroll = () => {
    if (!isMobile()) return;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, lockedScrollY || 0);
  };

  const openChat = () => setOpen(true);
  const closeChat = () => setOpen(false);

  const buildHello = () => chat.hello;

  const refreshChat = () => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = null;

    setTyping(false);
    setInput("");

    if (typeof window !== "undefined") {
      const newId = crypto.randomUUID();
      localStorage.setItem("chatSessionId", newId);
      setSessionId(newId);
    }

    setMsgs([{ role: "bot", text: buildHello() }]);

    setTimeout(() => {
      inputRef.current?.focus();
      scrollToBottom();
    }, 80);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const vv = window.visualViewport;
    if (!vv) return;

    const onResize = () => {
      const offset = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty(
        "--ms_chat_keyboard_offset",
        `${offset}px`
      );
    };

    vv.addEventListener("resize", onResize);
    vv.addEventListener("scroll", onResize);
    onResize();

    return () => {
      vv.removeEventListener("resize", onResize);
      vv.removeEventListener("scroll", onResize);
      document.documentElement.style.removeProperty("--ms_chat_keyboard_offset");
    };
  }, []);

  useEffect(() => {
    if (!open) {
      if (abortRef.current) abortRef.current.abort();
      setTyping(false);
      unlockPageScroll();
      return;
    }

    lockPageScroll();

    setMsgs([{ role: "bot", text: buildHello() }]);

    const timer = setTimeout(() => {
      inputRef.current?.focus();
      scrollToBottom();
    }, 220);

    return () => {
      clearTimeout(timer);
      unlockPageScroll();
    };
  }, [open, locale]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") closeChat();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    scrollToBottom();
  }, [msgs.length, typing, open]);

  const sendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || typing) return;

    setInput("");
    setMsgs((prev) => [...prev, { role: "user", text }]);
    setTyping(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const resp = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({ sessionId, chatInput: text, locale }),
      });

      if (!resp.body) {
        const fallback = await resp.text();
        setMsgs((prev) => [...prev, { role: "bot", text: fallback || "OK" }]);
        return;
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();

      let botIndex = -1;
      setMsgs((prev) => {
        botIndex = prev.length;
        return [...prev, { role: "bot", text: "" }];
      });

      let fullText = "";
      let lastChunkTime = Date.now();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const now = Date.now();
        const delta = now - lastChunkTime;
        if (delta < 80) await new Promise((r) => setTimeout(r, 80 - delta));

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((x) => x.trim() !== "");

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json?.type === "item" && typeof json.content === "string") {
              fullText += json.content;

              setMsgs((prev) => {
                if (botIndex < 0 || botIndex >= prev.length) return prev;
                const next = [...prev];
                next[botIndex] = { role: "bot", text: fullText };
                return next;
              });

              lastChunkTime = Date.now();
            }
          } catch {}
        }
      }
    } catch (err) {
      if (err?.name === "AbortError") return;
      setMsgs((prev) => [...prev, { role: "bot", text: chat.error }]);
    } finally {
      setTyping(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  };

  return (
    <>
      <button
        className={`ms_chat_button ${open ? "is-hidden" : ""}`}
        type="button"
        aria-label={chat.openLabel}
        onClick={openChat}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M21 11.5C21.0035 12.8195 20.6951 14.1219 20.1166 15.3C19.309 17.0881 17.7439 18.5475 15.7486 19.2397C14.6562 19.6084 13.4887 19.7654 12.3156 19.6934C11.1426 19.6215 10.0097 19.3228 9 18.8271L3 20.5L4.673 14.5C4.17719 13.4903 3.87854 12.3574 3.80663 11.1844C3.73472 10.0113 3.89165 8.84382 4.26031 7.75139C4.95247 5.75614 6.4119 4.19105 8.2 3.3834C9.37805 2.80487 10.6805 2.49652 12 2.5C16.1421 2.5 19.5 5.85786 19.5 10V11C19.5 11.2761 19.2761 11.5 19 11.5H21Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`ms_chat_modal ${open ? "open" : ""}`}
        aria-hidden={open ? "false" : "true"}
        role="dialog"
        aria-labelledby="ms_chat_title"
      >
        <div className="ms_chat_backdrop" onClick={closeChat} />

        <div className="ms_chat_panel" onClick={(e) => e.stopPropagation()}>
          <div className="ms_chat_actions">
            <button
              className="ms_chat_refresh"
              type="button"
              aria-label={chat.refreshLabel}
              onClick={refreshChat}
              disabled={typing}
              title={chat.refreshLabel}
            >
              ⟳
            </button>

            <button
              className="ms_chat_close"
              type="button"
              aria-label={chat.closeLabel}
              onClick={closeChat}
              title={chat.closeLabel}
            >
              ✕
            </button>
          </div>

          <div className="ms_chat_head">
            <h2 className="ms_chat_title" id="ms_chat_title">
              {chat.title}
            </h2>
            <div className="ms_chat_subtitle">{chat.subtitle}</div>
          </div>

          <div className="ms_chat_messages" ref={messagesRef}>
            {msgs.map((m, i) => (
              <div
                key={i}
                className={`ms_chat_msg ${
                  m.role === "user" ? "is-user" : "is-bot"
                }`}
              >
                {m.text}
              </div>
            ))}

            {typing && (
              <div className="ms_chat_typing">
                <span className="ms_chat_dot" />
                <span className="ms_chat_dot" />
                <span className="ms_chat_dot" />
              </div>
            )}
          </div>

          <form className="ms_chat_form" onSubmit={sendMessage}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={chat.inputPlaceholder}
              required
              disabled={!open || typing}
            />
            <button type="submit" disabled={!open || typing}>
              {chat.send}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
