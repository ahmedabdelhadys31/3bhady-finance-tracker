#!/usr/bin/env python3
"""Daily market prices for Financial Aid ("بكام النهاردة" → الأسهم والصناديق).

Runs on GitHub Actions (see .github/workflows/markets.yml). It never touches anyone's data:
it only writes public market prices into the markets/ folder of the site.

  markets/latest.json      last price, change and date for every stock, fund and index
  markets/h/<SYMBOL>.json  daily price history (stocks and indices: up to 5 years; funds: grows every day)

Sources
  * Stocks and indices (Egypt and world): Yahoo Finance daily chart; Google Finance as a second source
    for the last price when Yahoo has nothing.
  * Egyptian mutual funds: the daily fund price table Mubasher publishes ("أسعار وثائق صناديق الاستثمار المصرية").
If a source fails, the last good numbers stay as they are.
"""
import datetime as dt
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(ROOT, 'markets')
HIST = os.path.join(OUT, 'h')
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

# (symbol shown in the app, Yahoo symbol, Google Finance symbol, Arabic name, English name, currency, group)
EGX = [
    ('COMI', 'البنك التجاري الدولي', 'Commercial International Bank'),
    ('TMGH', 'طلعت مصطفى القابضة', 'Talaat Moustafa Group'),
    ('SWDY', 'السويدي إليكتريك', 'Elsewedy Electric'),
    ('ETEL', 'المصرية للاتصالات', 'Telecom Egypt'),
    ('EAST', 'الشرقية للدخان', 'Eastern Company'),
    ('HRHO', 'إي اف جي القابضة', 'EFG Holding'),
    ('FWRY', 'فوري', 'Fawry'),
    ('ABUK', 'أبوقير للأسمدة', 'Abu Qir Fertilizers'),
    ('EFIH', 'إي فاينانس', 'e-finance'),
    ('ESRS', 'حديد عز', 'Ezz Steel'),
    ('AMOC', 'الإسكندرية للزيوت المعدنية', 'AMOC'),
    ('JUFO', 'جهينة', 'Juhayna'),
    ('PHDC', 'بالم هيلز', 'Palm Hills'),
    ('EKHO', 'القابضة المصرية الكويتية', 'Egypt Kuwait Holding'),
    ('MFPC', 'مصر لإنتاج الأسمدة (موبكو)', 'MOPCO'),
    ('CIEB', 'كريدي أجريكول مصر', 'Credit Agricole Egypt'),
    ('ADIB', 'مصرف أبوظبي الإسلامي', 'ADIB Egypt'),
    ('HDBK', 'بنك التعمير والإسكان', 'Housing & Development Bank'),
    ('EMFD', 'إعمار مصر', 'Emaar Misr'),
    ('ORHD', 'أوراسكوم للتنمية', 'Orascom Development'),
    ('ORAS', 'أوراسكوم كونستراكشون', 'Orascom Construction'),
    ('MASR', 'مدينة مصر', 'Madinet Masr'),
    ('HELI', 'مصر الجديدة للإسكان', 'Heliopolis Housing'),
    ('SKPC', 'سيدي كرير للبتروكيماويات', 'Sidi Kerir Petrochemicals'),
    ('CCAP', 'القلعة', 'Qalaa Holdings'),
    ('BTFH', 'بلتون القابضة', 'Beltone Holding'),
    ('EFID', 'إيديتا', 'Edita'),
    ('OCDI', 'سوديك', 'SODIC'),
    ('EGAL', 'مصر للألومنيوم', 'Egypt Aluminum'),
    ('ISPH', 'ابن سينا فارما', 'Ibnsina Pharma'),
    ('MBSC', 'مصر بني سويف للأسمنت', 'Misr Beni Suef Cement'),
    ('PHAR', 'إيبيكو', 'EIPICO'),
    ('ZMID', 'زهراء المعادي', 'Zahraa Maadi'),
    ('GBCO', 'جي بي كوربوريشن', 'GB Corp'),
    ('RAYA', 'راية القابضة', 'Raya Holding'),
    ('CLHO', 'كليوباترا', 'Cleopatra Hospitals'),
    ('ARCC', 'العربية للأسمنت', 'Arabian Cement'),
    ('EGCH', 'كيما', 'KIMA'),
    ('ATQA', 'مصر الوطنية للصلب (عتاقة)', 'Misr National Steel'),
    ('FAIT', 'بنك فيصل الإسلامي', 'Faisal Islamic Bank'),
    ('SAUD', 'بنك البركة', 'Al Baraka Bank Egypt'),
    ('QNBE', 'QNB مصر', 'QNB Egypt'),
    ('TALM', 'تعليم', 'Taaleem'),
    ('MTIE', 'إم إم جروب', 'MM Group'),
    ('ACGC', 'العربية لحليج الأقطان', 'Arab Cotton Ginning'),
    ('POUL', 'القاهرة للدواجن', 'Cairo Poultry'),
    ('OLFI', 'عبور لاند', 'Obour Land'),
    ('VALU', 'فاليو', 'valU'),
]
WORLD = [
    ('AAPL', 'AAPL', 'AAPL:NASDAQ', 'أبل', 'Apple', 'USD'),
    ('MSFT', 'MSFT', 'MSFT:NASDAQ', 'مايكروسوفت', 'Microsoft', 'USD'),
    ('NVDA', 'NVDA', 'NVDA:NASDAQ', 'إنفيديا', 'NVIDIA', 'USD'),
    ('AMZN', 'AMZN', 'AMZN:NASDAQ', 'أمازون', 'Amazon', 'USD'),
    ('GOOGL', 'GOOGL', 'GOOGL:NASDAQ', 'جوجل (ألفابت)', 'Alphabet', 'USD'),
    ('META', 'META', 'META:NASDAQ', 'ميتا', 'Meta', 'USD'),
    ('TSLA', 'TSLA', 'TSLA:NASDAQ', 'تسلا', 'Tesla', 'USD'),
    ('NFLX', 'NFLX', 'NFLX:NASDAQ', 'نتفليكس', 'Netflix', 'USD'),
    ('AMD', 'AMD', 'AMD:NASDAQ', 'إيه إم دي', 'AMD', 'USD'),
    ('BRK-B', 'BRK-B', 'BRK.B:NYSE', 'بيركشاير هاثاواي', 'Berkshire Hathaway', 'USD'),
    ('JPM', 'JPM', 'JPM:NYSE', 'جي بي مورجان', 'JPMorgan Chase', 'USD'),
    ('V', 'V', 'V:NYSE', 'فيزا', 'Visa', 'USD'),
    ('KO', 'KO', 'KO:NYSE', 'كوكاكولا', 'Coca-Cola', 'USD'),
    ('2222.SR', '2222.SR', '2222:TADAWUL', 'أرامكو السعودية', 'Saudi Aramco', 'SAR'),
    ('1120.SR', '1120.SR', '1120:TADAWUL', 'مصرف الراجحي', 'Al Rajhi Bank', 'SAR'),
    ('SPY', 'SPY', 'SPY:NYSEARCA', 'صندوق S&P 500 (SPY)', 'SPDR S&P 500 ETF', 'USD'),
    ('QQQ', 'QQQ', 'QQQ:NASDAQ', 'صندوق ناسداك 100 (QQQ)', 'Invesco QQQ', 'USD'),
    ('VOO', 'VOO', 'VOO:NYSEARCA', 'صندوق فانجارد S&P 500', 'Vanguard S&P 500 ETF', 'USD'),
    ('GLD', 'GLD', 'GLD:NYSEARCA', 'صندوق الدهب SPDR', 'SPDR Gold Shares', 'USD'),
]
INDEX = [
    ('EGX30', '^CASE30', 'EGX30:EGX', 'مؤشر EGX30', 'EGX 30', 'EGP'),
    ('SPX', '^GSPC', '.INX:INDEXSP', 'مؤشر S&P 500', 'S&P 500', 'USD'),
    ('NDX', '^IXIC', '.IXIC:INDEXNASDAQ', 'مؤشر ناسداك', 'Nasdaq Composite', 'USD'),
    ('DJI', '^DJI', '.DJI:INDEXDJX', 'مؤشر داو جونز', 'Dow Jones', 'USD'),
    ('TASI', '^TASI.SR', 'TASI:TADAWUL', 'مؤشر تاسي السعودي', 'Tadawul All Share', 'SAR'),
]


def get(url, tries=3, accept='*/*'):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': UA, 'Accept': accept, 'Accept-Language': 'ar,en;q=0.8'})
            with urllib.request.urlopen(req, timeout=25) as r:
                return r.read().decode('utf-8', 'replace'), r.geturl()
        except Exception as e:  # noqa: BLE001
            last = e
            time.sleep(2 + 3 * i)
    raise last


def safe(sym):
    return re.sub(r'[^A-Za-z0-9_.-]', '_', sym)


def load(path, default):
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except Exception:  # noqa: BLE001
        return default


def dump(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    tmp = path + '.tmp'
    with open(tmp, 'w', encoding='utf-8') as f:
        json.dump(obj, f, ensure_ascii=False, separators=(',', ':'))
    os.replace(tmp, path)


def yahoo(ysym):
    """daily closes for 5 years: [[YYYY-MM-DD, close], ...] and the latest price"""
    for host in ('query1', 'query2'):
        try:
            txt, _ = get('https://%s.finance.yahoo.com/v8/finance/chart/%s?range=5y&interval=1d&includePrePost=false' % (host, urllib.parse.quote(ysym)), accept='application/json')
            j = json.loads(txt)
            res = j['chart']['result'][0]
            ts = res.get('timestamp') or []
            cl = res['indicators']['quote'][0].get('close') or []
            gmt = (res.get('meta') or {}).get('gmtoffset') or 0
            out = []
            for t, c in zip(ts, cl):
                if c is None:
                    continue
                d = dt.datetime.fromtimestamp(t + gmt, dt.timezone.utc).strftime('%Y-%m-%d')
                if out and out[-1][0] == d:
                    out[-1][1] = round(c, 4)
                else:
                    out.append([d, round(c, 4)])
            meta = res.get('meta') or {}
            last = meta.get('regularMarketPrice')
            lt = meta.get('regularMarketTime')
            if last and lt:
                d = dt.datetime.fromtimestamp(lt + gmt, dt.timezone.utc).strftime('%Y-%m-%d')
                if out and out[-1][0] == d:
                    out[-1][1] = round(last, 4)
                elif not out or d > out[-1][0]:
                    out.append([d, round(last, 4)])
            if out:
                return out
        except Exception as e:  # noqa: BLE001
            print('yahoo', ysym, host, e, file=sys.stderr)
    return []


def google_last(gsym):
    try:
        txt, _ = get('https://www.google.com/finance/quote/%s?hl=en' % gsym)
        m = re.search(r'data-last-price="([0-9.]+)"', txt)
        if m:
            return float(m.group(1))
    except Exception as e:  # noqa: BLE001
        print('google', gsym, e, file=sys.stderr)
    return None


def merge_hist(old, new):
    d = {r[0]: r[1] for r in (old or [])}
    for r in new:
        d[r[0]] = r[1]
    return [[k, d[k]] for k in sorted(d)]


def securities(today):
    rows = []
    items = [(s, s + '.CA', s + ':EGX', ar, en, 'EGP', 'eg') for s, ar, en in EGX]
    items += [(a, b, c, d, e, f, 'gl') for a, b, c, d, e, f in WORLD]
    items += [(a, b, c, d, e, f, 'ix') for a, b, c, d, e, f in INDEX]
    for sym, ysym, gsym, ar, en, cur, grp in items:
        hp = os.path.join(HIST, safe(sym) + '.json')
        old = load(hp, {}).get('p', [])
        h = yahoo(ysym)
        if not h:
            g = google_last(gsym)
            if g:
                h = [[today, round(g, 4)]]
        h = merge_hist(old, h)
        if not h:
            print('no data', sym, file=sys.stderr)
            continue
        h = h[-1900:]
        if h != old:
            dump(hp, {'s': sym, 'cur': cur, 'p': h})
        last = h[-1]
        prev = h[-2][1] if len(h) > 1 else None
        rows.append({'s': sym, 'n': ar, 'e': en, 'g': grp, 'cur': cur, 'p': last[1], 'd': last[0],
                     'pv': prev, 'c': round((last[1] / prev - 1) * 100, 2) if prev else None})
        time.sleep(0.4)
    return rows


AR_NUM = str.maketrans('٠١٢٣٤٥٦٧٨٩٫٬', '0123456789.,')


class Cells:
    """collects the text of every table row in an HTML page"""

    def __init__(self, page):
        self.rows = []
        for tr in re.findall(r'<tr[^>]*>(.*?)</tr>', page, flags=re.S | re.I):
            cells = [html.unescape(re.sub(r'<[^>]+>', ' ', c)).strip() for c in re.findall(r'<t[dh][^>]*>(.*?)</t[dh]>', tr, flags=re.S | re.I)]
            cells = [re.sub(r'\s+', ' ', c) for c in cells]
            if cells:
                self.rows.append(cells)


def parse_funds(page):
    """[(name, nav, currency)] from Mubasher's daily fund price table"""
    out, cur = [], 'EGP'
    for cells in Cells(page).rows:
        joined = ' '.join(cells)
        if 'دولار' in joined and not re.search(r'\d', joined):
            cur = 'USD'
            continue
        if 'السعر بالدولار' in joined:
            cur = 'USD'
            continue
        if len(cells) < 2:
            continue
        a, b = cells[0].translate(AR_NUM).replace(',', ''), cells[1]
        if re.fullmatch(r'\d+(\.\d+)?', a) and b and not re.fullmatch(r'[\d.,]+', b):
            out.append((b, float(a), cur))
        elif re.fullmatch(r'\d+(\.\d+)?', cells[-1].translate(AR_NUM).replace(',', '')) and not re.fullmatch(r'[\d.,]+', cells[0]):
            out.append((cells[0], float(cells[-1].translate(AR_NUM).replace(',', '')), cur))
    return out


def fund_date(text):
    m = re.search(r'(\d{1,2})-(\d{1,2})-(20\d\d)', text)
    if m:
        return '%s-%02d-%02d' % (m.group(3), int(m.group(2)), int(m.group(1)))
    return None


def fund_article_links():
    """newest Mubasher fund-price articles, found through news search feeds"""
    q = 'أسعار وثائق صناديق الاستثمار المصرية'
    links = []
    feeds = [
        'https://www.bing.com/news/search?q=%s&format=rss&qft=sortbydate%%3d%%221%%22' % urllib.parse.quote('"%s"' % q),
        'https://news.google.com/rss/search?q=%s&hl=ar&gl=EG&ceid=EG:ar' % urllib.parse.quote(q + ' when:7d'),
    ]
    for f in feeds:
        try:
            txt, _ = get(f)
        except Exception as e:  # noqa: BLE001
            print('feed', f, e, file=sys.stderr)
            continue
        for item in re.findall(r'<item>(.*?)</item>', txt, flags=re.S):
            title = html.unescape(re.sub(r'<[^>]+>', '', (re.search(r'<title>(.*?)</title>', item, flags=re.S) or [None, ''])[1]))
            link = html.unescape((re.search(r'<link>(.*?)</link>', item, flags=re.S) or [None, ''])[1]).strip()
            if 'صناديق' not in title:
                continue
            m = re.search(r'[?&]url=([^&]+)', link)
            if m and 'bing.com' in link:
                link = urllib.parse.unquote(m.group(1))
            links.append((fund_date(title) or fund_date(urllib.parse.unquote(link)) or '', link, title))
    links.sort(key=lambda x: x[0], reverse=True)
    return links


def funds(today):
    fh_path = os.path.join(OUT, 'funds-hist.json')
    FH = load(fh_path, {})
    got = None
    for d, link, title in fund_article_links()[:6]:
        try:
            page, final = get(link)
        except Exception as e:  # noqa: BLE001
            print('fund page', link, e, file=sys.stderr)
            continue
        rows = parse_funds(page)
        if len(rows) >= 10:
            got = (d or fund_date(urllib.parse.unquote(final)) or today, rows, final)
            break
    if got:
        d, rows, src = got
        for name, nav, cur in rows:
            key = name.strip()
            h = FH.setdefault(key, {'cur': cur, 'p': []})
            h['cur'] = cur
            if not h['p'] or h['p'][-1][0] < d:
                h['p'].append([d, nav])
            elif h['p'][-1][0] == d:
                h['p'][-1][1] = nav
            h['p'] = h['p'][-1900:]
        FH['_src'] = {'d': d, 'url': src}
        dump(fh_path, FH)
    out = []
    for name, h in FH.items():
        if name.startswith('_') or not h.get('p'):
            continue
        last = h['p'][-1]
        prev = h['p'][-2][1] if len(h['p']) > 1 else None
        sym = 'F:' + re.sub(r'\s+', ' ', name)
        out.append({'s': sym, 'n': name, 'e': name, 'g': 'fd', 'cur': h.get('cur', 'EGP'), 'p': last[1], 'd': last[0],
                    'pv': prev, 'c': round((last[1] / prev - 1) * 100, 2) if prev else None})
        dump(os.path.join(HIST, safe(sym) + '.json'), {'s': sym, 'cur': h.get('cur', 'EGP'), 'p': h['p']})
    return out, (FH.get('_src') or {})


def main():
    now = dt.datetime.now(dt.timezone.utc)
    today = (now + dt.timedelta(hours=2)).strftime('%Y-%m-%d')
    os.makedirs(HIST, exist_ok=True)
    prev = load(os.path.join(OUT, 'latest.json'), {})
    sec = securities(today)
    fd, fsrc = funds(today)
    keep = {r['s']: r for r in prev.get('items', [])}
    for r in sec + fd:
        keep[r['s']] = r
    items = sorted(keep.values(), key=lambda r: ({'ix': 0, 'eg': 1, 'fd': 2, 'gl': 3}.get(r['g'], 9), r['s']))
    dump(os.path.join(OUT, 'latest.json'), {
        'at': now.strftime('%Y-%m-%dT%H:%M:%SZ'),
        'src': {'stocks': 'Yahoo Finance / Google Finance', 'funds': 'مباشر', 'fundsDay': fsrc.get('d'), 'fundsUrl': fsrc.get('url')},
        'items': items,
    })
    print('stocks', len(sec), 'funds', len(fd), 'total', len(items))


if __name__ == '__main__':
    main()
