import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <main className={css.page}>
      <h1 className={css.code}>404</h1>
      <p className={css.message}>Sayfa bulunamadı.</p>
      <Link to="/" className={css.link}>Ana Sayfaya Dön</Link>
    </main>
  );
}
