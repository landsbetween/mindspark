"use client";

import { t } from "@/lib/t";
import { useEffect } from "react";

export default function ConsultationModal({
  open,
  onClose,
  title = "Отримати консультацію",
  locale = "ua",
}) {
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <>
      <div className="modal-backdrop fade show" onClick={onClose} />
      <div
        className="modal fade show"
        role="dialog"
        aria-modal="true"
        style={{ display: "block" }}
        onClick={onClose}
      >
        <div className="modal-dialog" role="document" onClick={stop}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const form = e.currentTarget;
                const fd = new FormData(form);

                const payload = {
                  email: fd.get("email"),
                  phone: fd.get("phone"),
                  telegram: fd.get("telegram"),
                  message: fd.get("message"),
                };

                try {
                  await fetch("/api/consultation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  form.reset();
                  onClose();
                } catch (err) {
                  console.error("Form submit error:", err);
                }
              }}
            >
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="msEmail">Email</label>
                  <input
                    id="msEmail"
                    name="email"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msPhone">{t(locale, "phone")}</label>
                  <input
                    id="msPhone"
                    name="phone"
                    type="tel"
                    className="form-control"
                    placeholder="+ 380 000 000 000"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msTg">Telegram</label>
                  <input
                    id="msTg"
                    name="telegram"
                    type="text"
                    className="form-control"
                    placeholder={t(locale, "example_of_telegrams")}
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msMsg">{t(locale, "message")}</label>
                  <textarea
                    id="msMsg"
                    name="message"
                    className="form-control"
                    rows="4"
                    placeholder={t(locale, "briefly_describe_request")}
                  />
                </div>
              </div>

              <div className="modal-footer justify-content-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg modal-submit-btn"
                >
                  {t(locale, "send_request")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
