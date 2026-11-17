"use client";

import Image from "next/image";
import { useCartStore } from "@/lib/store/cartStore";
import css from "./GoodsOrderList.module.css";
import { useEffect, useState } from "react";

export default function GoodsOrderList() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + (item.price?.value ?? 0) * item.quantity,
    0,
  );

  const total = subtotal;

  const formatPrice = (value: number, currency = "грн") =>
    `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${currency}`;

  return (
    <section className={css.containerList}>
      <ul className={css.list}>
        {items.map((item) => (
          <li
            key={`${item._id}-${item.size || "default"}`}
            className={css.item}
          >
            <Image
              src={item.image}
              alt={item.name}
              width={82}
              height={101}
              className={css.image}
            />

            <div className={css.detailsWrapper}>
              <div className={css.info}>
                <h3 className={css.title}>{item.name}</h3>
                {item.size && (
                  <p className={css.subtitle}>Розмір: {item.size}</p>
                )}
                <div className={css.meta}>
                  <span className={css.rating}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/icons.svg#star-filled" />
                    </svg>
                    {item.rating ?? 0}
                  </span>
                  <span className={css.reviews}>
                    <svg className={css.icon} width="16" height="16">
                      <use href="/icons.svg#comment" />
                    </svg>
                    {item.feedbackCount ?? 0}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={css.controls}>
               <p className={css.price}>
                {formatPrice(
                  (item.price?.value ?? 0) * item.quantity,
                  item.price?.currency,
                )}
              </p>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(
                    item._id,
                    Number(e.target.value) || 1,
                    item.size,
                  )
                }
                className={css.quantityInput}
                aria-label="Кількість товару"
              />
              <button
                type="button"
                onClick={() => removeItem(item._id, item.size)}
                className={css.removeBtn}
                aria-label="Видалити товар"
              >
                <svg className={css.icon} width="16" height="16">
                  <use href="/icons.svg#delete" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className={css.summary}>
        <div className={css.summaryRow}>
          <span>Проміжний підсумок</span>
          <span className={css.summaryValue}>{formatPrice(subtotal)}</span>
        </div>

        <div className={css.summaryRow}>
          <span>Доставка</span>
          <span className={css.summaryValue}>За тарифами перевізника</span>
        </div>

        <div className={css.totalRow}>
          <span>Всього</span>
          <span className={css.formatRow}>{formatPrice(total)}</span>
        </div>
      </div>
    </section>
  );
}
