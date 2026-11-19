from pathlib import Path
from playwright.sync_api import sync_playwright

root = Path(__file__).resolve().parents[1]
assets = root / 'mirror' / 'assets' / 'platform'
mark = (assets / 'bawsaq-market-mark.svg').read_text(encoding='utf-8')

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
    page.set_content(f'''<!doctype html><html><head><style>
      * {{ box-sizing: border-box; }}
      body {{ margin: 0; width: 1200px; height: 630px; overflow: hidden;
        background: radial-gradient(circle at 50% 34%, #56203a 0%, #260f22 60%, #180d1a 100%);
        color: #fff0d9; font-family: Georgia, serif; }}
      .rule {{ position: absolute; inset: 25px; border: 2px solid #b88752; }}
      .mark {{ position: absolute; top: 60px; left: 492px; width: 216px; height: 216px; }}
      h1 {{ position: absolute; top: 268px; width: 100%; margin: 0; text-align: center;
        font: 900 116px/1 Georgia, serif; letter-spacing: .065em; text-shadow: 5px 5px #ad1c64; }}
      .caption {{ position: absolute; top: 416px; width: 100%; text-align: center;
        font: 600 24px/1.2 Arial, sans-serif; letter-spacing: .29em; color: #efb957; }}
      .footer {{ position: absolute; bottom: 65px; width: 100%; text-align: center;
        font: 500 19px/1.2 Arial, sans-serif; letter-spacing: .14em; color: #e8cdbb; }}
    </style></head><body><div class="rule"></div><div class="mark">{mark}</div>
    <h1>BAWSAQ</h1><div class="caption">SIX AI STOCKS</div>
    <div class="footer">THE VICE CITY AI MARKET</div></body></html>''')
    page.screenshot(path=str(assets / 'bawsaq-market-share.png'))
    page.set_viewport_size({'width': 512, 'height': 512})
    page.set_content(f'''<!doctype html><html><head><style>
      html,body {{ margin: 0; width: 512px; height: 512px; background: transparent; }}
      svg {{ width: 512px; height: 512px; display: block; }}
    </style></head><body>{mark}</body></html>''')
    page.screenshot(path=str(assets / 'bawsaq-market-mark.png'), omit_background=True)
    page.set_viewport_size({'width': 1024, 'height': 1024})
    page.set_content(f'''<!doctype html><html><head><style>
      * {{ box-sizing: border-box; }}
      html,body {{ margin: 0; width: 1024px; height: 1024px; overflow: hidden; }}
      body {{ background: radial-gradient(circle at 50% 35%, #62203e 0%, #310f28 60%, #180d1b 100%); }}
      .border {{ position: absolute; inset: 33px; border: 3px solid #af7750; }}
      .mark {{ position: absolute; top: 120px; left: 178px; width: 668px; height: 668px; }}
      .name {{ position: absolute; top: 777px; width: 100%; text-align: center; color: #fff0d9;
        font: 900 94px/1 Georgia, serif; letter-spacing: .075em; text-shadow: 5px 5px #ad1c64; }}
    </style></head><body><div class="border"></div><div class="mark">{mark}</div>
    <div class="name">BAWSAQ</div></body></html>''')
    page.screenshot(path=str(assets / 'bawsaq-market-avatar.png'))
    browser.close()
