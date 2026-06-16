# Cases — Трафик и Воронки

Статический сайт с кейсами по трафику и автоворонкам.

## Структура

- `index.html` — основные кейсы (карточки + модальные окна)
- `recent.html` — более поздние кейсы (большие / средние / с нуля)
- `images/` — карточки кейсов
- `js/` — данные и логика
- `Dockerfile` + `nginx.conf` — деплой на Railway

## Локально

```bash
python3 -m http.server 8080
```

Открыть http://localhost:8080

## GitHub Pages

- Кейсы: https://projectretr0.github.io/cases/
- Резюме (меню): https://projectretr0.github.io/cases/resume/
- CMO: https://projectretr0.github.io/cases/resume/cmo.html
- Маркетолог: https://projectretr0.github.io/cases/resume/marketer.html

## Резюме (`resume/`)

Отдельная папка в этом же репо — два резюме без перекрёстных ссылок.

- `resume/index.html` — меню выбора (только для себя)
- `resume/cmo.html` — директор по маркетингу
- `resume/marketer.html` — маркетолог

Пересборка после правок данных:

```bash
node resume/scripts/build-static.js
```
