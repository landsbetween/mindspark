"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

export default function ChatPage() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const locale = parts[0] === "en" ? "en" : "ua";

  return (
    <>
      <Script id="ms-chat-callbacks" strategy="afterInteractive">
        {`
          window.myChatCallbacks = {
            onWidgetOpen: function (data) {
              console.log("Widget opened:", data);

              if (window.innerWidth <= 768) {
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                document.body.style.position = 'fixed';
                document.body.style.top = '-' + scrollY + 'px';
                document.body.style.left = '0';
                document.body.style.right = '0';
                document.body.dataset.scrollLock = String(scrollY);

                function preventTouchMove(e) {
                  const widgetEl = document.querySelector('.n8n-chat-ui-bot-container');
                  if (widgetEl && !widgetEl.contains(e.target)) e.preventDefault();
                }
                document._preventTouchMove = preventTouchMove;
                document.addEventListener('touchmove', preventTouchMove, { passive: false });
              }
            },

            onWidgetClose: function (data) {
              console.log("Widget closed:", data);

              if (window.innerWidth <= 768) {
                const scrollY = parseInt(document.body.dataset.scrollLock || '0', 10);
                document.removeEventListener('touchmove', document._preventTouchMove, { passive: false });

                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.left = '';
                document.body.style.right = '';
                delete document.body.dataset.scrollLock;

                window.scrollTo(0, scrollY);
              }
            },

            beforeSubmit: function (data) {
              // return { ...data, locale: "${locale}" };
              return data;
            },

            onResponseReceived: function (data) {},
            onError: function (data) { console.log("Widget error:", data); },

            onChatClear: function (data) {
              console.log("Chat cleared:", data);
              const newId = crypto.randomUUID();
              localStorage.setItem("chatSessionId", newId);
              console.log("NEW session ID:", newId);
            }
          };
        `}
      </Script>

      <Script
        id="ms-chat-embed"
        type="module"
        strategy="afterInteractive"
      >{`
        import n8nChatUiWidget from 'https://proxy.n8nchatui.com/api/embed/4ozbsB';

        n8nChatUiWidget.load({
          callbackRegistry: "myChatCallbacks",
        });

        console.log("n8n widget loaded");
      `}</Script>
    </>
  );
}
