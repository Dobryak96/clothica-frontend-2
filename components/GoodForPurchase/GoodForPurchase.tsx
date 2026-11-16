"use client";


import React, { useState } from "react";
import Image from "next/image";
import styles from "./GoodForPurchase.module.css";


export interface GoodItem {
  id: number | string;
  name: string;
  categoryName?: string;
  price: number;
  rating?: number;
  reviewsTotal?: number;
  image?: string;
  description?: string;
  shortDescription?: string;
  sizes?: string[];
}


export default function GoodForPurchase({
  good,
  onAddToCart
}: {
  good?: GoodItem;
  onAddToCart?: (data: { id: number | string; name: string; price: number; quantity: number; size: string }) => void;
}) {
  const rating = good?.rating ?? 4.5;
  const reviewsTotal = good?.reviewsTotal ?? 10;
  const name = good?.name ?? "Базова футболка";
  const categoryName = good?.categoryName ?? "Всі товари";
  const price = good?.price ?? 750;
  const sizes = good?.sizes ?? ["XS", "S", "M", "L", "XL"];
 
  // Локальный стейт для выбранного размера и количества
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0] || "M");
  const [quantity, setQuantity] = useState<number>(1);
 
  const shortDesc = good?.shortDescription ?? "Універсальний елемент гардеробу на кожен день. Виконана з м'якої бавовни, приємна до тіла та добре тримає форму. Лаконічний дизайн дозволяє легко поєднувати футболку з джинсами, шортами чи під жакет. Ідеальний вибір для тих, хто цінує комфорт і мінімалізм.";
 
  const fullDesc = good?.description ?? "Базова футболка Clothica — це ідеальний вибір для тих, хто цінує комфорт, якість та універсальність. Виготовлена зі 100% натуральної бавовни, вона приємна до тіла, добре пропускає повітря та підходить для щоденного носіння у будь-яку пору року.\n\nЛаконічний дизайн без зайвих деталей робить футболку універсальною основою гардеробу: її легко поєднувати з джинсами, шортами, брюками чи навіть під піджак. Прямий крій забезпечує свободу рухів, а м'який матеріал зберігає форму навіть після багаторазових прань.";


  return (
    <section className={styles.purchaseSection}>
      {/* 1. ЛІВА КОЛОНКА: Блок фото */}
      <div className={styles.imageContainer}>
        {good?.image ? (
          <Image
            src={good.image}
            alt={name}
            width={500}
            height={600}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholderBox}>
            <span>Фото згодом з&apos;явиться</span>
          </div>
        )}
      </div>


      {/* 2. ПРАВА КОЛОНКА: Інформація */}
      <div className={styles.infoContainer}>
        {/* Хлібні крошки (з жирним останнім елементом) */}
        <div className={styles.breadcrumbs}>
          <span>{categoryName}</span>
          <span className={styles.breadcrumbSeparator}>&gt;</span>
          <span className={styles.breadcrumbCurrent}>{name}</span>
        </div>


        <h1 className={styles.title}>{name}</h1>


        {/* Блок ціни */}
        <div className={styles.metaRow}>
          <span className={styles.price}>{price} грн</span>
         
          <span className={styles.divider}></span>


          <div className={styles.ratingWrapper}>
            <div className={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((starIndex) => {
                const fillPercentage = Math.max(0, Math.min(1, rating - (starIndex - 1))) * 100;
               
                return (
                  <div key={starIndex} className={styles.starWrapper}>
                    {/* Фонова зірка з тонким чорним контуром */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                    {/* Заповнена чорна частина зірки */}
                    <div className={styles.starFill} style={{ width: `${fillPercentage}%` }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#111111" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>


            <span className={styles.ratingText}>
              ({rating}) &bull; {reviewsTotal} відгуків
            </span>
          </div>
        </div>


        {/* Короткий опис*/}
        <p className={styles.shortDescription}>
          {shortDesc}
        </p>


        {/* Форма покупки*/}
        <div className={styles.purchaseForm}>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>Розмір</label>
            <div className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {sizes.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <svg className={styles.selectIcon} width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>


          <div className={styles.actionsRow}>
            <button
              className={styles.addToCartBtn}
              onClick={() => {
                if (onAddToCart) {
                  onAddToCart({
                    id: good?.id ?? 1,
                    name: name,
                    price: price,
                    quantity: quantity,
                    size: selectedSize
                  });
                }
              }}
            >
              Додати в кошик
            </button>
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className={styles.quantityInput}
            />
          </div>


          <button className={styles.buyNowBtn}>Купити зараз</button>


          <div className={styles.deliveryNote}>
            Безкоштовна доставка для замовлень від 1000 грн
          </div>
        </div>


        {/* Повний опис*/}
        <div className={styles.detailsSection}>
          <h3 className={styles.detailsTitle}>Опис</h3>
          <p className={styles.detailsText}>
            {fullDesc}
          </p>


          <h4 className={styles.specsTitle}>Основні характеристики</h4>
          <ul className={styles.specsList}>
            <li>Матеріал: 100% бавовна</li>
            <li>Крій: прямий, унісекс</li>
            <li>Горловина: круглий виріз</li>
            <li>Догляд: машинне прання при 30°</li>
            <li>Доступні розміри: XS–XXL</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
