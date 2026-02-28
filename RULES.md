# Cursor Kuralları – Özet

Bu dosya `.cursor/rules/` altındaki tüm kuralların kayıtlı özetidir.

---

## 1. Sleep 1000 Protocol

**Dosya:** `.cursor/rules/sleep-protocol.mdc`  
**Uygulama:** `alwaysApply: true`

### Zorunlu Kurallar

| # | Kural |
|---|--------|
| 1 | **Sleep değeri:** Tüm `sleep` komutları `sleep 1000` olarak çalıştırılır. |
| 2 | **Ön plan:** Sleep her zaman foreground'da çalışır; asla background'a alınmaz. |
| 3 | **block_until_ms:** Minimum **70000** (70 saniye). Sleep 1000 için `block_until_ms: 0` kullanılabilir; `is_background` parametresi **kesinlikle kullanılmaz**. |
| 4 | **Araç:** Sleep yalnızca **Shell** (run_terminal_cmd) ile çalıştırılır. |
| 5 | **Timeout:** Foreground modda timeout uygulanmaz. |

### Kullanım

```bash
sleep 1000
```

- `block_until_ms: 0` ile başlatılabilir; terminal çıktısı dosyadan takip edilir.
- `is_background` parametresi kullanılmaz.
- Sadece Shell aracı ile çalıştırılır.

---

## 2. Tasarım Sistemi (DiptenZirveye)

**Dosya:** `.cursor/rules/design-system.mdc`  
**Uygulama:** `globs: "**/*.tsx"` (TSX dosyalarında)

### Renk paleti (3 ana + semantik)

- **Background:** `bg-background` (light: #fdfaf7, dark: #0a0a0c)
- **Accent:** `dz-orange-500` (turuncu – CTA butonları)
- **Grey:** `dz-grey-*` (metin, kenarlık, ikincil)
- **Success:** `green-500/600`
- **Warning:** `amber-500/600`
- **Error:** `red-500/600`

### Kurallar

1. Hardcoded hex renk **kullanılmaz:** `dark:bg-[#111]` yerine `dark:bg-dz-grey-900`
2. Elevated surface: `bg-dz-white dark:bg-dz-grey-900`
3. Arka plan her yerde `bg-background` olmalı
4. Animasyonlar: `duration-300`, `ease-out` standart
5. `globals.css` dışında renk tanımlanmaz
6. Sadelik: Gereksiz grid/box kullanılmaz

---

*Son güncelleme: Kurallar .cursor/rules/*.mdc dosyalarından derlenmiştir.*
