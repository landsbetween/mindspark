import { t } from "@/lib/t";

export default function Hero({ locale }) {
  return (
    <section className="text-center py-5 bg-white">
      <pre>
      locale = {String(locale)}
      {'\n'}
      title = {t(locale, 'heroTitle')}
    </pre>
      <div className="container">
        <h1 className="text-5xl font-bold text-blue-900">
          {t(locale, "heroTitle")}
        </h1>
        <p className="lead text-secondary my-4">
          MindSpark створює AI-агентів, сайти та автоматизацію
        </p>
        <button className="btn btn-primary btn-lg">
          Отримати консультацію
        </button>
      </div>
    </section>
  );
}
