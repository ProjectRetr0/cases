# Resume site

Статический сайт с двумя версиями резюме Романа Аксёнова.

## Страницы

| URL | Описание |
|-----|----------|
| `index.html` | Хаб — выбор версии |
| `cmo.html` | Директор по маркетингу / CMO, 200 000 ₽ |
| `marketer.html` | Маркетолог, 150 000 ₽ |

Кейсы: [projectretr0.github.io/cases](https://projectretr0.github.io/cases/)

## Локальный просмотр

Страницы **самодостаточные** (CSS и контент внутри HTML) — можно открыть `index.html` двойным кликом.

При правках данных:

```bash
cd club/sites/resume
node scripts/build-static.js
```

Или через сервер:

```bash
python3 -m http.server 8080
```

## Docker

```bash
docker build -t resume-site .
docker run -p 8080:80 resume-site
```

## GitHub Pages

Отдельный репозиторий (как cases): Settings → Pages → branch `main`, folder `/`.
