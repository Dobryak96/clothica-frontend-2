"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";

import { useAuthStore } from "@/lib/store/authStore";
import css from "./Header.module.css";

export default function Header() {
  /**
   * TODO (AUTH INTEGRATION):
   *
   * Owner: Developer responsible for Authentication/Profile.
   *
   * Zustand store:
   * @/lib/store/authStore
   *
   * Expected behavior:
   *
   * 1. After successful login or registration:
   *    update user in authStore.
   *
   * 2. When user !== null:
   *    Header displays "Кабінет".
   *
   * 3. When user === null:
   *    Header displays "Вхід" and "Реєстрація".
   *
   * 4. On logout:
   *    invalidate backend session and reset authStore.
   *
   * 5. Restore authentication state after page refresh.
   *
   * 6. Protect private routes independently of Header.
   *
   * Required routes:
   * /auth/login
   * /auth/register
   * /profile
   *
   * Note:
   * Header does not perform login, registration or logout.
   * It only reacts to authStore state changes.
   */

  const user = useAuthStore((state) => state.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /**
   * TODO (CART INTEGRATION):
   *
   * Owner: Developer responsible for Cart functionality.
   *
   * 1. Create or connect Zustand store:
   *    @/lib/store/cartStore
   *
   * 2. Cart store should expose:
   *    - items: CartItem[]
   *    - addItem()
   *    - removeItem()
   *    - updateQuantity()
   *
   * 3. Expected CartItem structure:
   *    {
   *      productId: string;
   *      quantity: number;
   *    }
   *
   * 4. Replace temporary cartCount with selector:
   *
   *    const cartCount = useCartStore((state) =>
   *      state.items.reduce(
   *        (total, item) => total + item.quantity,
   *        0
   *      )
   *    );
   *
   * 5. Ensure cart data is synchronized with backend
   *    if the API provides persistent cart storage.
   *
   * 6. Cart route: /basket
   *
   * Header only displays the total quantity.
   * Product and Cart components manage cart mutations.
   */

  const cartCount = 0;
  const pathname = usePathname();

  // Close menu and optionally restore focus to burger button
  const closeMenu = useCallback((restoreFocus = false) => {
    setIsMenuOpen(false);

    if (restoreFocus) {
      burgerRef.current?.focus();
    }
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock scrolling and manage keyboard focus
  useEffect(() => {
    if (!isMenuOpen) return;

    const header = headerRef.current;
    const menu = mobileMenuRef.current;

    if (!header || !menu) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    // Include header controls and mobile menu links
    const getFocusableElements = () =>
      Array.from(
        header.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => {
        const styles = window.getComputedStyle(element);

        return (
          !element.closest("[inert]") &&
          styles.visibility !== "hidden" &&
          element.getClientRects().length > 0
        );
      });

    // Move initial focus into mobile navigation
    const firstMenuLink = menu.querySelector<HTMLAnchorElement>("a[href]");

    firstMenuLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();

      if (elements.length === 0) {
        event.preventDefault();
        return;
      }

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      const currentElement = document.activeElement;

      if (event.shiftKey) {
        if (
          currentElement === firstElement ||
          !elements.includes(currentElement as HTMLElement)
        ) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (
          currentElement === lastElement ||
          !elements.includes(currentElement as HTMLElement)
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    // Keep programmatic focus inside the open menu
    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;

      if (target instanceof Node && !header.contains(target)) {
        firstMenuLink?.focus();
      }
    };

    // Close mobile menu when switching to tablet/desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    window.addEventListener("resize", handleResize);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      ref={headerRef}
      className={css.header}
      role={isMenuOpen ? "dialog" : undefined}
      aria-modal={isMenuOpen ? true : undefined}
      aria-label={isMenuOpen ? "Мобільне меню" : undefined}
    >
      <div className={`container ${css.headerContent}`}>
        {/* Logo */}
        <Link
          href="/"
          className={css.logo}
          aria-label="Clothica — головна сторінка"
          onClick={() => closeMenu()}
        >
          <Image
            src="/icons/company-logo.svg"
            alt="Clothica"
            width={84}
            height={36}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav className={css.navigation}>
          <Link href="/">Головна</Link>
          <Link href="/goods">Товари</Link>
          <Link href="/categories">Категорії</Link>
        </nav>

        {/* Right side */}
        <div className={css.headerActions}>
          {/* Authorization */}
          <div className={css.auth}>
            {user ? (
              <Link href="/profile" className={css.profileLink}>
                Кабінет
              </Link>
            ) : (
              <>
                <Link href="/auth/login" className={css.loginLink}>
                  Вхід
                </Link>

                <Link href="/auth/register" className={css.registerLink}>
                  Реєстрація
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            ref={burgerRef}
            type="button"
            className={css.burgerButton}
            onClick={() => {
              if (isMenuOpen) {
                closeMenu(true);
              } else {
                setIsMenuOpen(true);
              }
            }}
            aria-label={isMenuOpen ? "Menu Open" : "Menu is close"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <Image
              src={isMenuOpen ? "/icons/close.svg" : "/icons/menu.svg"}
              alt=""
              width={24}
              height={24}
            />
          </button>

          {/* Cart */}
          <Link
            href="/basket"
            className={css.cart}
            aria-label={`Кошик, товарів: ${cartCount}`}
            onClick={() => closeMenu()}
          >
            <Image
              src="/icons/shopping_cart.svg"
              alt=""
              width={24}
              height={24}
            />

            {cartCount > 0 && (
              <span className={css.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu from the site */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`${css.mobileMenu} ${isMenuOpen ? css.mobileMenuOpen : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <nav className={css.mobileNav} aria-label="Мобільна навігація">
          <Link href="/" onClick={() => closeMenu()}>
            Головна
          </Link>

          <Link href="/goods" onClick={() => closeMenu()}>
            Товари
          </Link>

          <Link href="/categories" onClick={() => closeMenu()}>
            Категорії
          </Link>
        </nav>

        {/* Mobile Authorization */}
        <div className={css.mobileAuth}>
          {user ? (
            <Link
              href="/profile"
              className={css.profileLink}
              onClick={() => closeMenu()}
            >
              Кабінет
            </Link>
          ) : (
            <>
              <Link
                href="/auth/login"
                className={css.loginLink}
                onClick={() => closeMenu()}
              >
                Вхід
              </Link>

              <Link
                href="/auth/register"
                className={css.registerLink}
                onClick={() => closeMenu()}
              >
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
