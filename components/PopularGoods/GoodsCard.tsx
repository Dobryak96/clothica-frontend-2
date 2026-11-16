import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../../types/goods";
import Icon from "../Icon/Icon";
import css from "./PopularGoods.module.css";

interface GoodsCardProps {
  product: Product;
}

export const GoodsCard = ({ product }: GoodsCardProps) => {
  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        {product.image && (
          <Image
            src={product.image}
            alt={product.name || "Product image"}
            width={300}
            height={300}
            className={css.image}
          />
        )}
      </div>

      <div className={css.info}>
        <div className={css.cardHeader}>
          <h3 className={css.cardTitle}>{product.name}</h3>
          <span className={css.price}>
            {typeof product.price === "object"
              ? `${product.price.value} ${product.price.currency}`
              : `${product.price} грн`}
          </span>
        </div>

        <div className={css.meta}>
          <span className={css.metaItem}>
            <Icon name="star" size={16} /> {product.rating ?? 0}
          </span>
          <span className={css.metaItem}>
            <Icon name="comment" size={16} /> {product.feedbacks?.length || 0}
          </span>
        </div>

        <Link
          href={`/goods/${product._id}`}
          className={`btn btn-secondary ${css.detailsBtn}`}
        >
          Детальніше
        </Link>
      </div>
    </div>
  );
};
