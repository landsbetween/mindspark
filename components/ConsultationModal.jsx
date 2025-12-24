"use client";

import { t } from "@/lib/t";
import { useEffect, useMemo, useState } from "react";

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

  const storageKey = useMemo(
    () => `mindspark_consultation_draft_${locale}`,
    [locale]
  );

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    telegram: "",
    message: "",
  });

  useEffect(() => {
    if (!open) {
      setErrors({});
      setSubmitting(false);
      setSuccess(false);
      return;
    }

    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        setFormData({
          email: String(parsed?.email ?? ""),
          phone: String(parsed?.phone ?? ""),
          telegram: String(parsed?.telegram ?? ""),
          message: String(parsed?.message ?? ""),
        });
      } else {
        setFormData({ email: "", phone: "", telegram: "", message: "" });
      }
    } catch {
      setFormData({ email: "", phone: "", telegram: "", message: "" });
    }
  }, [open, storageKey]);

  useEffect(() => {
    if (!open) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    } catch {
    }
  }, [formData, open, storageKey]);

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
      if (!emailOk) nextErrors.email = t(locale, "error_email_at");
    }

    if (phoneV) {
      const phoneStartOk =
        phoneV.startsWith("+38") ||
        phoneV.startsWith("38") ||
        phoneV.startsWith("0");

      if (!phoneStartOk) nextErrors.phone = t(locale, "error_number");
    }

    if (tgV) {
      const tgOk = tgV.startsWith("@") || tgV.startsWith("https://t.me/");
      if (!tgOk) nextErrors.telegram = t(locale, "error_telegram");
    }

    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (success) setSuccess(false);

    setErrors((prev) => {
      if (!prev[name] && !prev.common) return prev;
      const next = { ...prev };
      delete next[name];
      delete next.common;
      return next;
    });

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
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
                disabled={submitting}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (submitting) return;

                const payload = {
                  email: formData.email,
                  phone: formData.phone,
                  telegram: formData.telegram,
                  message: formData.message,
                };

                const nextErrors = validate(payload);
                if (Object.keys(nextErrors).length > 0) {
                  setSuccess(false);
                  setErrors(nextErrors);
                  return;
                }

                setErrors({});
                setSuccess(false);
                setSubmitting(true);

                try {
                  const res = await fetch("/api/consultation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  if (!res.ok) {
                    setErrors({ common: t(locale, "failed_send_request") });
                    setSubmitting(false);
                    setSuccess(false);
                    return;
                  }

                  // ✅ УСПІХ: очищуємо форму + очищуємо localStorage
                  setFormData({ email: "", phone: "", telegram: "", message: "" });
                  clearDraft();

                  setSubmitting(false);
                  setSuccess(true);
                  setTimeout(() => setSuccess(false), 2500);
                } catch (err) {
                  console.error("Form submit error:", err);
                  setErrors({ common: t(locale, "network_error") });
                  setSubmitting(false);
                  setSuccess(false);
                }
              }}
            >
              <div className="modal-body">
                {errors.common ? (
                  <div className="alert alert-danger" role="alert">
                    {errors.common}
                  </div>
                ) : null}

                {success ? (
                  <div className="alert alert-success" role="alert">
                    {t(locale, "request_tg_send")}
                  </div>
                ) : null}

                <div className="form-group">
                  <label htmlFor="msEmail">Email</label>
                  <input
                    id="msEmail"
                    name="email"
                    type="text"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="you@example.com"
                    autoComplete="off"
                    inputMode="email"
                    disabled={submitting}
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
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="+380 000 000 000"
                    autoComplete="off"
                    disabled={submitting}
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
                    value={formData.telegram}
                    onChange={handleChange}
                    className={`form-control ${errors.telegram ? "is-invalid" : ""}`}
                    placeholder={t(locale, "example_of_telegrams")}
                    autoComplete="off"
                    disabled={submitting}
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
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder={t(locale, "briefly_describe_request")}
                    disabled={submitting}
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
