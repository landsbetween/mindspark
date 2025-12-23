"use client";

import { t } from "@/lib/t";
import { useEffect } from "react";

export default function ConsultationModal({ open, onClose, title = "Отримати консультацію", locale = "ua" }) {
  useEffect(() => {
    if (open) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [open]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  return (
    <>
      <div
        className="modal-backdrop fade show"
        onClick={onClose}
      />
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
              <button type="button" className="close" aria-label="Close" onClick={onClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="msEmail">Email</label>
                  <input
                    id="msEmail"
                    type="email"
                    className="form-control"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msPhone">{t(locale, "phone")}</label>
                  <input
                    id="msPhone"
                    type="tel"
                    className="form-control"
                    placeholder="+ 380 000 000 000"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msTg">Telegram</label>
                  <input
                    id="msTg"
                    type="text"
                    className="form-control"
                    placeholder={t(locale, "example_of_telegrams")}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="msMsg">{t(locale, "message")}</label>
                  <textarea
                    id="msMsg"
                    className="form-control"
                    rows="4"
                    placeholder={t(locale, "briefly_describe_request")}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
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
