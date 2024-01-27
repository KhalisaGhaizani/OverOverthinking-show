
let kumpulanPertanyaanDanJawabanPengguna = [
    { 
        pertanyaan: `Apa yang sedang kamu pikirkan?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apakah menurut kamu pemikiranmu selalu akurat (terjadi di dunia nyata) atau bermanfaat? Mengapa atau mengapa tidak? `,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Pernahkah kamu mengalami situasi di mana asumsi 
        atau keyakinan awal kamu terbukti salah? Bagaimana kamu menangani situasi itu?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apa bukti yang mendukung pemikiran yang sedang kamu alami?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apa bukti yang bertentangan dengan pemikiran ini?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Asumsi atau keyakinan apa yang mendasari pemikiran ini?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apakah ada cara yang lebih akurat atau objektif untuk memikirkan ini? Jika iya, apa?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apakah asumsi atau keyakinan ini benar atau sesuai fakta yang kamu ketahui?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apa yang terjadi jika terus berpikir seperti ini?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apakah yang terjadi bermanfaat atau tidak?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apakah ada penjelasan alternatif untuk pemikiran ini yang mungkin kamu abaikan?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apa hal terburuk yang bisa terjadi jika kamu berhenti berpikir seperti ini?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Apa hal terbaik yang bisa terjadi jika kamu mulai berpikir secara berbeda?`,
        jawabanPengguna: ``   
    },
    { 
        pertanyaan: `Hal produktif apa yang dapat kamu lakukan sekarang?`,
        jawabanPengguna: ``   
    },
]

const pertanyaan = document.querySelector(".pertanyaan")
const input = document.getElementById("user-input") 
const submitBtn = document.getElementById("submit-btn") 
const sesiBaruBtn = document.getElementById("sesi-baru-btn") 
const selesai = document.getElementById("selesai") 
const tempatSesiTanyaJawab = document.getElementById("sesi-tanya-jawab") 
const pilihanSesi = document.getElementById("pilihan-sesi")
const error = document.getElementById("error")

let isSelesai = false;
let defaultNomorPertanyaan = 0
let nomorPertanyaan = defaultNomorPertanyaan 

function getUrutanPilihanSesi() {
    let urutanPilihanSesi = JSON.parse(localStorage.getItem("urutanPilihanSesi"))

    if (localStorage.getItem("urutanPilihanSesi") == null) {
      urutanPilihanSesi = [];
    }
    return urutanPilihanSesi;
}
function sesiMulai(i){ 
    pertanyaan.textContent = kumpulanPertanyaanDanJawabanPengguna[i].pertanyaan
    input.classList.remove('red-placeholder')
    input.placeholder = 'Tulis jawaban anda di sini...'
}

function tampilSemuaIsiSesi(arr){ 
    let html = ''
    let leftDiv = document.getElementById('kiri')

    for(let i = 0; i < arr.length; i++){
        html += 
        `<p class="pertanyaan-selesai">${arr[i].pertanyaan}</p>
        <p class="jawaban">${arr[i].jawabanPengguna}</p>`
    }
    leftDiv.style.justifyContent = 'flex-start'
    selesai.innerHTML = html
}
function tampilkanPilihanSesiSebelumnya(arr){

        let html = ''
        for(let i = 0; i < arr.length; i++){

            html += `
            <div class="sesi-dan-hapus-satu">
                <button class="hapus-satu" id="${arr[i]}-hapus" onclick="hapusSatu(${i},'${arr[i]}')">X</button>
                <button class="sesi-lain" id="${arr[i]}" onclick="tampilHasilSesiSebelumnya('${arr[i]}')">${arr[i]}</button>
            </div>
            `
        }
        pilihanSesi.innerHTML = html
    
}
function hapusSatu(i, sesi) {
    let urutanPilihanSesi = getUrutanPilihanSesi();
    urutanPilihanSesi.splice(i, 1);
    localStorage.setItem("urutanPilihanSesi", JSON.stringify(urutanPilihanSesi));
    localStorage.removeItem(sesi)

    tampilkanPilihanSesiSebelumnya(urutanPilihanSesi)
  }
function save(arr){ 
    let sesiDiTanggalYangSama = localStorage.getItem("sesiDiTanggalYangSama") 
    if( localStorage.getItem( "sesiDiTanggalYangSama" ) == null ){
        sesiDiTanggalYangSama = 1
    }
    const tanggal = new Date()

    const tanggalSaatSesi = `${tanggal.getDate()}/${(tanggal.getMonth() + 1).toString().padStart(2, '0')}/${tanggal.getFullYear()}`
    if( localStorage.getItem(tanggalSaatSesi) !== null){
        localStorage.setItem(tanggalSaatSesi + ` (${sesiDiTanggalYangSama})`, JSON.stringify(kumpulanPertanyaanDanJawabanPengguna))

        arr.push(`${tanggalSaatSesi} (${sesiDiTanggalYangSama})`)
        sesiDiTanggalYangSama++
        
        localStorage.setItem("urutanPilihanSesi", JSON.stringify(arr))
        localStorage.setItem("sesiDiTanggalYangSama", sesiDiTanggalYangSama)
    } else {
        localStorage.setItem(tanggalSaatSesi, JSON.stringify(kumpulanPertanyaanDanJawabanPengguna))
        arr.push(tanggalSaatSesi)
        sesiDiTanggalYangSama = 1

        localStorage.setItem("urutanPilihanSesi", JSON.stringify(arr))
        localStorage.setItem("sesiDiTanggalYangSama", sesiDiTanggalYangSama)
    }
}
function submit(i){
    if( input.value !== ''){
        if( nomorPertanyaan === kumpulanPertanyaanDanJawabanPengguna.length - 1 ){
            kumpulanPertanyaanDanJawabanPengguna[i].jawabanPengguna = input.value
        
            tempatSesiTanyaJawab.style.display = "none"
            tampilSemuaIsiSesi(kumpulanPertanyaanDanJawabanPengguna) 
            save(getUrutanPilihanSesi())
            tampilkanPilihanSesiSebelumnya(getUrutanPilihanSesi())
            isSelesai = true;
        } else {
            kumpulanPertanyaanDanJawabanPengguna[i].jawabanPengguna = input.value
            input.value = ''
            nomorPertanyaan++

            sesiMulai( nomorPertanyaan )
        }
    }
    else {
        input.placeholder = 'Kamu belum mengisi apa-apa!'
        input.classList.add('red-placeholder');
    }
}
function tampilHasilSesiSebelumnya(arr){
    tampilSemuaIsiSesi(JSON.parse(localStorage.getItem(`${arr}`)))
    tempatSesiTanyaJawab.style.display = "none"
    nomorPertanyaan = kumpulanPertanyaanDanJawabanPengguna.length - 1
    isSelesai = true;
    
    if(window.innerWidth <= 897){
        tampilkanDivKanan()
    }
    
}

submitBtn.addEventListener( "click", () => submit( nomorPertanyaan ) )

function sesiBaru(){
    if(isSelesai === false){
        alert("Kamu belum selesai menjawab semua pertanyaan!")
    } else {
        isSelesai = false;
        selesai.innerHTML = ''
        tempatSesiTanyaJawab.style.display = "block"
        nomorPertanyaan = defaultNomorPertanyaan
        sesiMulai(nomorPertanyaan)
        input.value = ''

        if(window.innerWidth <= 897){
            tampilkanDivKanan()
        }
    }
}

function tampilkanDivKanan() {
    let hamburgerList = document.querySelector('.hamburger-menu')
    let rightDiv = document.getElementById('kanan')
    let closeButton = document.querySelector('.close-button')
    let leftDiv = document.getElementById('kiri')
    
    if (hamburgerList.classList.contains('show')) {
      hamburgerList.classList.remove('show')
      rightDiv.classList.remove('show')
      closeButton.classList.remove('show')
      leftDiv.classList.remove('blur-background')
    } else {
      hamburgerList.classList.add('show')
      rightDiv.classList.add('show')
      closeButton.classList.add('show')
      leftDiv.classList.add('blur-background')
    }
}
  
document.getElementById('hamburger-menu').addEventListener('click', tampilkanDivKanan)
  
document.querySelector('.close-button').addEventListener('click', tampilkanDivKanan)
  
window.addEventListener('resize', function() {
    if (window.innerWidth > 897) {
      document.querySelector('.hamburger-menu').classList.remove('show')
      document.getElementById('kanan').classList.remove('show')
      document.querySelector('.close-button').classList.remove('show')
      document.getElementById('kiri').classList.remove('blur-background')
    }
})
document.addEventListener("keydown", () => {
    if( event.key === "Enter" && isSelesai === false){
        submit(nomorPertanyaan)
    }
})

sesiMulai(nomorPertanyaan)

tampilkanPilihanSesiSebelumnya(getUrutanPilihanSesi())


