const PHONE_NUMBER = 62081234567890


document.addEventListener("DOMContentLoaded", () => {
    // NAVBAR
    const buttonNav = document.querySelector("nav button")
    const mobileNav = document.querySelector(".mobileNav")
    const mobileNavButton = document.querySelector(".mobileNav button")

    buttonNav.addEventListener("click", () => {
        mobileNav.style.left = "0%"
    })
    mobileNavButton.addEventListener("click", () => {
        mobileNav.style.left = "-150%"
    })

    // CONTACT
    const btnContact = document.querySelector(".special-contact-btn")
    btnContact.addEventListener("click", () => {
        document.location.href = "https://smp-saraswati-dps.sch.id/"
    })

    // SEARCH
    // Ambil elemen dari HTML
    const searchInput = document.getElementById('searchInput');
    const cardContainer = document.getElementById('cardContainer');
    const noResultsMessage = document.createElement('div');
    noResultsMessage.id = 'noResultsMessage';
    noResultsMessage.style.display = 'none';
    noResultsMessage.style.textAlign = 'center';
    noResultsMessage.style.color = '#0f0f0f';
    noResultsMessage.style.fontFamily = 'JakartaSansMedium';
    noResultsMessage.style.fontSize = '1rem';
    noResultsMessage.textContent = 'Nama tidak ditemukan.';
    cardContainer.appendChild(noResultsMessage);

    function renderCards(data) {
    cardContainer.innerHTML = '';
    cardContainer.appendChild(noResultsMessage);

    data.forEach(student => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-name', student.nama);
        card.setAttribute('data-class', student.grade);

        // Isi card
        card.innerHTML = `
        <div class="imageCard">
            <img src="${student.urlImage}" alt="photo profile ${student.nama}" class="main-img">
            <img src="default_assets/imgs/bg-hero.svg" alt="background icon" class="bg-hero">
        </div>
        <div class="descriptionCard">
            <p>${student.nama}</p>
            <span>${student.grade}</span>
            <a href="${student.link}">View More <img src="default_assets/imgs/arrow.svg" alt="arrow"></a>
        </div>
        `;

        cardContainer.appendChild(card);
    });
    }

    // Fungsi untuk pencarian
    function searchCards(query, data) {
    let visibleCards = 0;
    const queryLower = query.toLowerCase();

    const cards = document.querySelectorAll('.card'); // Ambil semua elemen card
    cards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        const grade = card.getAttribute('data-class').toLowerCase();

        // Cocokkan query dengan data name atau class
        if (name.includes(queryLower) || grade.includes(queryLower)) {
        card.style.display = ''; // Tampilkan card
        visibleCards++;
        } else {
        card.style.display = 'none'; // Sembunyikan card
        }
    });

    // Tampilkan pesan jika tidak ada hasil
    noResultsMessage.style.display = visibleCards === 0 ? 'block' : 'none';
    }

    // Fetch data JSON
    fetch('data.json')
    .then(response => response.json())
    .then(data => {
        renderCards(data); // Render card pertama kali

        // Tambahkan event listener untuk pencarian
        searchInput.addEventListener('input', () => {
        searchCards(searchInput.value, data);
        });
    })
    .catch(error => console.error('Gagal memuat data:', error));

    // ANIMATION HERO
    const imageHero = document.querySelector('.imageHero');
    const mainImg = document.querySelector('.main-img');
    const studentName = document.querySelector('.studentName');
    const studentGrade = document.querySelector('.studentGrade');

    fetch('data.json').then(response => response.json()).then(data => {
        function updateContent() {
            // Pilih data secara acak
            const randomData = data[Math.floor(Math.random() * data.length)];
    
            // Tambahkan class untuk animasi
            imageHero.classList.add('switch-image');
    
            // Tunggu animasi selesai sebelum mengganti konten
            setTimeout(() => {
                mainImg.src = randomData.urlImage;
                studentName.textContent = randomData.nama;
                studentGrade.textContent = randomData.grade;
    
                // Hapus class setelah konten diperbarui
                imageHero.classList.remove('switch-image');
            }, 600); // Waktu sesuai durasi animasi (0.6s)
        }
    
        // Jalankan perubahan setiap 3 detik
        setInterval(updateContent, 6000);
    })


})