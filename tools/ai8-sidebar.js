const sidebar=document.querySelector('.ai8-sidebar');
if(sidebar){
  const current=location.pathname.replace(/\/$/,'');
  const home=new URL(sidebar.querySelector('.ai8-side-brand').href).pathname.replace(/\/$/,'');
  for(const link of sidebar.querySelectorAll('.ai8-side-card')){
    const path=new URL(link.href).pathname.replace(/\/$/,'');
    if(path===current||(path!==home&&current.startsWith(path+'/')))link.setAttribute('aria-current','page');
  }
  const sideWallet=sidebar.querySelector('.ai8-side-wallet');
  sideWallet?.addEventListener('click',()=>{
    document.querySelector('.lse-masthead-actions button:not(.lse-menu-trigger)')?.click();
  });
  if(sideWallet){
    const syncWallet=()=>{
      const connected=document.querySelector('.lse-masthead-actions .custom-wallet-button.connected');
      const short=connected?.querySelector('.wallet-button-copy b')?.textContent?.trim();
      const label=connected?`Wallet ${short||'connected'}`:'Connect wallet';
      if(sideWallet.textContent!==label)sideWallet.textContent=label;
      sideWallet.setAttribute('aria-label',connected?`Connected wallet ${short||''}. Open wallet controls.`:'Connect wallet');
      sideWallet.dataset.connected=connected?'true':'false';
    };
    syncWallet();
    window.setInterval(syncWallet,500);
  }
}
