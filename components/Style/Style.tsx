import css from "./Style.module.css";
import Image from "next/image";

export default function Style() {
  return (
    <section className={css.style}>
      <h2 className={css.title}>Обери свій унікальний стиль сьогодні</h2>
      <div className={css.features}>
        <div className={css.feature}>
          <Image src="/icons/Heading1.svg" alt="" width={56} height={56} />
          <h3>Якість та натуральність</h3>
          <p>
            тільки приємні до тіла тканини, які зберігають форму навіть після
            десятків прань.
          </p>
        </div>
        <div className={css.feature}>
          <Image src="/icons/Heading2.svg" alt="" width={56} height={56} />
          <h3>Універсальний дизайн</h3>
          <p>
            базові кольори та лаконічний стиль, що легко комбінуються між собою.
          </p>
        </div>
        <div className={css.feature}>
          <Image src="/icons/Heading3.svg" alt="" width={56} height={56} />
          <h3>Комфорт на кожен день</h3>
          <p>одяг, який не обмежує рухів і підходить для будь-якої ситуації.</p>
        </div>
      </div>
    </section>
  );
}
