import css from './ErrorMessage.module.css';

export default function ErrorMessage({ message = 'Bir hata oluştu. Lütfen tekrar deneyin.' }) {
  return (
    <div className={css.error}>
      <p>{message}</p>
    </div>
  );
}
