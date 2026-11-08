window.LOCALEGUARD_DEMO = {
  "rules": {
    "schemaVersion": "1.0",
    "baselineLocale": "en-US",
    "locales": [
      "ru-RU",
      "de-DE",
      "fr-FR",
      "ar-SA"
    ],
    "confirmedRules": {
      "KEY_MISSING": {
        "severity": "high"
      },
      "VALUE_EMPTY": {
        "severity": "high"
      },
      "PLACEHOLDER_MISMATCH": {
        "severity": "critical"
      },
      "ICU_UNBALANCED_BRACES": {
        "severity": "high"
      },
      "ICU_MISSING_PLURAL_CATEGORY": {
        "severity": "high"
      },
      "REQUIRED_TAG_MISMATCH": {
        "severity": "high"
      },
      "EDGE_WHITESPACE": {
        "severity": "medium"
      }
    },
    "heuristicRules": {
      "SOURCE_COPY_SUSPECTED": {
        "severity": "medium",
        "minimumLetters": 4
      },
      "UI_LENGTH_RISK": {
        "severity": "medium"
      },
      "TERMINOLOGY_VARIATION": {
        "severity": "low"
      },
      "RTL_INTERPOLATION_REVIEW": {
        "severity": "medium"
      }
    },
    "pluralCategories": {
      "en-US": [
        "one",
        "other"
      ],
      "ru-RU": [
        "one",
        "few",
        "many",
        "other"
      ],
      "de-DE": [
        "one",
        "other"
      ],
      "fr-FR": [
        "one",
        "other"
      ],
      "ar-SA": [
        "zero",
        "one",
        "two",
        "few",
        "many",
        "other"
      ]
    },
    "rtlLocales": [
      "ar-SA"
    ],
    "safeguards": {
      "sourceCopyAllowlist": [
        "app.title",
        "settings.notifications"
      ],
      "ignoreNonTranslatableTokens": [
        "Northstar"
      ],
      "rtlInterpolationAllowlist": [
        "checkout.subtotal",
        "checkout.shipping",
        "checkout.total",
        "checkout.delivery_eta",
        "settings.delete_confirm"
      ],
      "terminologyChecks": {
        "fr-FR": {
          "profile.email.label": {
            "preferred": "adresse e-mail",
            "disallowed": [
              "e-mail"
            ]
          }
        }
      }
    }
  },
  "contexts": {
    "schemaVersion": "1.0",
    "fixtures": {
      "checkout.cart": {
        "screen": "Checkout",
        "component": "CartSummary",
        "testValues": {
          "count": [
            0,
            1,
            2,
            5,
            21
          ]
        }
      },
      "checkout.order": {
        "screen": "Checkout",
        "component": "OrderSummary",
        "testValues": {
          "orderId": "NS-1042",
          "amount": "€1,249.00",
          "date": "2026-11-15"
        }
      },
      "checkout.payment": {
        "screen": "Checkout",
        "component": "PaymentForm"
      },
      "profile": {
        "screen": "Profile",
        "component": "ProfileForm",
        "testValues": {
          "firstName": "Samira"
        }
      },
      "settings": {
        "screen": "Settings",
        "component": "SettingsPanel",
        "testValues": {
          "accountName": "samira@example.test"
        }
      }
    },
    "keyConstraints": {
      "checkout.place_order": {
        "fixture": "checkout.order",
        "maxCharacters": 32,
        "singleLine": true
      },
      "settings.privacy_notice": {
        "fixture": "settings",
        "requiredTags": [
          "a"
        ]
      },
      "checkout.cart.items": {
        "fixture": "checkout.cart",
        "icuPlural": true
      },
      "checkout.order_number": {
        "fixture": "checkout.order"
      },
      "checkout.total": {
        "fixture": "checkout.order"
      },
      "profile.greeting": {
        "fixture": "profile"
      },
      "profile.saved": {
        "fixture": "profile"
      },
      "profile.email.label": {
        "fixture": "profile"
      }
    }
  },
  "locales": {
    "en-US": {
      "app.title": "Northstar Store",
      "nav.checkout": "Checkout",
      "nav.profile": "Profile",
      "nav.settings": "Settings",
      "checkout.cart.title": "Your cart",
      "checkout.cart.items": "{count, plural, one {# item} other {# items}}",
      "checkout.order_number": "Order {orderId}",
      "checkout.subtotal": "Subtotal: {amount}",
      "checkout.shipping": "Shipping: {amount}",
      "checkout.total": "Total: {amount}",
      "checkout.place_order": "Place order",
      "checkout.payment.card_declined": "Your card was declined. Try another payment method.",
      "checkout.delivery_eta": "Delivery by {date}",
      "profile.title": "Your profile",
      "profile.greeting": "Hello, {firstName}!",
      "profile.email.label": "Email address",
      "profile.email.help": "We use your email for receipts and security alerts.",
      "profile.save": "Save changes",
      "profile.saved": "Changes saved",
      "settings.title": "Settings",
      "settings.language": "Language",
      "settings.notifications": "Notifications",
      "settings.marketing_opt_in": "Send me product news and offers",
      "settings.privacy_notice": "Read our <a>Privacy Policy</a>",
      "settings.delete_account": "Delete account",
      "settings.delete_confirm": "Delete {accountName}? This action cannot be undone."
    },
    "ru-RU": {
      "app.title": "Магазин Northstar",
      "nav.checkout": "Оформление заказа",
      "nav.profile": "Профиль",
      "nav.settings": "Настройки",
      "checkout.cart.title": "Ваша корзина",
      "checkout.cart.items": "{count, plural, one {# товар} many {# товаров} other {# товара}}",
      "checkout.order_number": "Заказ {orderId}",
      "checkout.subtotal": "Промежуточный итог: {amount}",
      "checkout.shipping": "Доставка: {amount}",
      "checkout.total": "Итого: {sum}",
      "checkout.place_order": "Оформить заказ",
      "checkout.delivery_eta": "Доставка до {date}",
      "profile.title": "Ваш профиль",
      "profile.greeting": "Здравствуйте, {firstName}!",
      "profile.email.label": "Адрес электронной почты",
      "profile.email.help": "Мы используем вашу почту для чеков и уведомлений безопасности.",
      "profile.save": "Сохранить изменения",
      "profile.saved": "Изменения сохранены",
      "settings.title": "Настройки",
      "settings.language": "Язык",
      "settings.notifications": "Уведомления",
      "settings.marketing_opt_in": "Присылать новости о продуктах и предложениях",
      "settings.privacy_notice": "Прочитайте нашу <a>Политику конфиденциальности</a>",
      "settings.delete_account": "Удалить аккаунт",
      "settings.delete_confirm": "Удалить {accountName}? Это действие нельзя отменить."
    },
    "de-DE": {
      "app.title": "Northstar Store",
      "nav.checkout": "Kasse",
      "nav.profile": "Profil",
      "nav.settings": "Einstellungen",
      "checkout.cart.title": "Ihr Warenkorb",
      "checkout.cart.items": "{count, plural, one {# Artikel} other {# Artikel}}",
      "checkout.order_number": "Bestellung {orderId}",
      "checkout.subtotal": "Zwischensumme: {amount}",
      "checkout.shipping": "Versand: {amount}",
      "checkout.total": "Gesamt: {amount}",
      "checkout.place_order": "Zahlungspflichtige Bestellung jetzt verbindlich abschließen",
      "checkout.payment.card_declined": "Ihre Karte wurde abgelehnt. Versuchen Sie eine andere Zahlungsmethode.",
      "checkout.delivery_eta": "Lieferung bis {date}",
      "profile.title": "Ihr Profil",
      "profile.greeting": "Hallo, {firstName}!",
      "profile.email.label": "E-Mail-Adresse",
      "profile.email.help": "Wir verwenden Ihre E-Mail für Belege und Sicherheitshinweise.",
      "profile.save": "Save changes",
      "profile.saved": "Änderungen gespeichert",
      "settings.title": "Einstellungen",
      "settings.language": "Sprache",
      "settings.notifications": "Benachrichtigungen",
      "settings.marketing_opt_in": "Senden Sie mir Produktneuigkeiten und Angebote",
      "settings.privacy_notice": "Lesen Sie unsere <a>Datenschutzerklärung</a>",
      "settings.delete_account": "Konto löschen",
      "settings.delete_confirm": "{accountName} löschen? Diese Aktion kann nicht rückgängig gemacht werden."
    },
    "fr-FR": {
      "app.title": "Boutique Northstar",
      "nav.checkout": "Paiement",
      "nav.profile": "Profil",
      "nav.settings": "Paramètres",
      "checkout.cart.title": "Votre panier",
      "checkout.cart.items": "{count, plural, one {# article} other {# articles}",
      "checkout.order_number": "Commande {orderId}",
      "checkout.subtotal": "Sous-total : {amount}",
      "checkout.shipping": "Livraison : {amount}",
      "checkout.total": "Total : {amount}",
      "checkout.place_order": "Passer la commande",
      "checkout.payment.card_declined": "Votre carte a été refusée. Essayez un autre moyen de paiement.",
      "checkout.delivery_eta": "Livraison avant le {date}",
      "profile.title": "Votre profil",
      "profile.greeting": "Bonjour, {firstName} !",
      "profile.email.label": "E-mail",
      "profile.email.help": "Nous utilisons votre courriel pour les reçus et les alertes de sécurité.",
      "profile.save": "Enregistrer les modifications",
      "profile.saved": "Modifications enregistrées ",
      "settings.title": "Paramètres",
      "settings.language": "Langue",
      "settings.notifications": "Notifications",
      "settings.marketing_opt_in": "M’envoyer les actualités et les offres produits",
      "settings.privacy_notice": "Consultez notre Politique de confidentialité",
      "settings.delete_account": "Supprimer le compte",
      "settings.delete_confirm": "Supprimer {accountName} ? Cette action est irréversible."
    },
    "ar-SA": {
      "app.title": "متجر نورث ستار",
      "nav.checkout": "الدفع",
      "nav.profile": "الملف الشخصي",
      "nav.settings": "الإعدادات",
      "checkout.cart.title": "سلة التسوق",
      "checkout.cart.items": "{count, plural, one {عنصر واحد} other {# عناصر}}",
      "checkout.order_number": "الطلب {number}",
      "checkout.subtotal": "المجموع الفرعي: {amount}",
      "checkout.shipping": "الشحن: {amount}",
      "checkout.total": "الإجمالي: {amount}",
      "checkout.place_order": "تأكيد الطلب",
      "checkout.payment.card_declined": "تم رفض بطاقتك. جرّب طريقة دفع أخرى.",
      "checkout.delivery_eta": "التسليم بحلول {date}",
      "profile.title": "ملفك الشخصي",
      "profile.greeting": "مرحبًا، {firstName}!",
      "profile.email.label": "عنوان البريد الإلكتروني",
      "profile.email.help": "نستخدم بريدك للإيصالات وتنبيهات الأمان.",
      "profile.save": "حفظ التغييرات",
      "profile.saved": "تم حفظ التغييرات",
      "settings.title": "الإعدادات",
      "settings.language": "اللغة",
      "settings.notifications": "الإشعارات",
      "settings.marketing_opt_in": "أرسل لي أخبار المنتجات والعروض",
      "settings.privacy_notice": "اقرأ <a>سياسة الخصوصية</a>",
      "settings.delete_account": "حذف الحساب",
      "settings.delete_confirm": "هل تريد حذف {accountName}؟ لا يمكن التراجع عن هذا الإجراء."
    }
  }
};
