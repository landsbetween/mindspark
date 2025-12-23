"use client";

import { t } from "@/lib/t";
import { useEffect, useState } from "react";

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

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) {
      setErrors({});
      setSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const stop = (e) => e.stopPropagation();

  const normalize = (v) => String(v ?? "").trim();

  const validate = ({ email, phone, telegram }) => {
    const nextErrors = {};

    const emailV = normalize(email);
    const phoneV = normalize(phone);
    const tgV = normalize(telegram);

    if (!emailV && !phoneV && !tgV) {
      nextErrors.common = t(locale, "error_empty_field");
      return nextErrors;
    }

    if (emailV) {
      const emailOk = emailV.includes("@");
      if (!emailOk) {
        nextErrors.email = t(locale, "error_email_at");
      }
    }

    if (phoneV) {
      const phoneStartOk =
        phoneV.startsWith("+38") || phoneV.startsWith("38") || phoneV.startsWith("0");

      if (!phoneStartOk) {
        nextErrors.phone = t(locale, "error_number");
      }
    }

    if (tgV) {
      const tgOk =
        tgV.startsWith("@") || tgV.startsWith("https://t.me/");

      if (!tgOk) {
        nextErrors.telegram = t(locale, "error_telegram");
      }
    }

    return nextErrors;
  };

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
                if (submitting) return;

                const form = e.currentTarget;
                const fd = new FormData(form);

                const payload = {
                  email: fd.get("email"),
                  phone: fd.get("phone"),
                  telegram: fd.get("telegram"),
                  message: fd.get("message"),
                };

                const nextErrors = validate(payload);
                if (Object.keys(nextErrors).length > 0) {
                  setErrors(nextErrors);
                  return;
                }

                setErrors({});
                setSubmitting(true);

                try {
                  const res = await fetch("/api/consultation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  if (!res.ok) {
                    setErrors({
                      common: t(locale, "failed_send_request"),
                    });
                    setSubmitting(false);
                    return;
                  }

                  form.reset();
                  onClose();
                } catch (err) {
                  console.error("Form submit error:", err);
                  setErrors({
                    common: "Помилка мережі. Перевір інтернет і спробуй ще раз.",
                  });
                  setSubmitting(false);
                }
              }}
            >
              <div className="modal-body">
                {errors.common ? (
                  <div className="alert alert-danger" role="alert">
                    {errors.common}
                  </div>
                ) : null}

                <div className="form-group">
                  <label htmlFor="msEmail">Email</label>
                  <input
                    id="msEmail"
                    name="email"
                    type="text"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="you@example.com"
                    autoComplete="off"
                    inputMode="email"
                  />
                  {errors.email ? (
                    <div className="invalid-feedback">{errors.email}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="msPhone">{t(locale, "phone")}</label>
                  <input
                    id="msPhone"
                    name="phone"
                    type="tel"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="+380 000 000 000"
                    autoComplete="off"
                  />
                  {errors.phone ? (
                    <div className="invalid-feedback">{errors.phone}</div>
                  ) : null}
                </div>

                <div className="form-group">
                  <label htmlFor="msTg">Telegram</label>
                  <input
                    id="msTg"
                    name="telegram"
                    type="text"
                    className={`form-control ${errors.telegram ? "is-invalid" : ""}`}
                    placeholder={t(locale, "example_of_telegrams")}
                    autoComplete="off"
                  />
                  {errors.telegram ? (
                    <div className="invalid-feedback">{errors.telegram}</div>
                  ) : null}
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
                  disabled={submitting}
                >
                  {submitting ? "Sending..." : t(locale, "send_request")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
