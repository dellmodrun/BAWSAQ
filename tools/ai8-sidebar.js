const sidebar=document.querySelector('.ai8-sidebar');
if(sidebar){
  const current=location.pathname.replace(/\/$/,'');
  const home=new URL(sidebar.querySelector('.ai8-side-brand').href).pathname.replace(/\/$/,'');
  for(const link of sidebar.querySelectorAll('.ai8-side-card')){
    const path=new URL(link.href).pathname.replace(/\/$/,'');
    if(path===current||(path!==home&&current.startsWith(path+'/')))link.setAttribute('aria-current','page');
  }
  sidebar.querySelector('.ai8-side-wallet')?.addEventListener('click',()=>{
    document.querySelector('.lse-masthead-actions button:not(.lse-menu-trigger)')?.click();
  });
}
