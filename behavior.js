document.addEventListener('DOMContentLoaded', function() {
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slideshow > div');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    // Add event listeners to buttons
    document.querySelector('.next').addEventListener('click', nextSlide);
    document.querySelector('.prev').addEventListener('click', prevSlide);

    // Initialize first slide
    showSlide(0);
});

const ctx = document.getElementById('myChart');

fetch('data.json')
.then(function(response) {
    if(response.ok) {
        return response.json();
    }
})
.then(function(data) {
        createChart(data);
    });

function createChart(data) {
  const colors = [
    '#FF6384',
    '#36A2EB',
    '#FFCE56',
    '#4BC0C0',
    '#9966FF',
    '#FF9F40',
    '#FF6384',
    '#C9CBCF'
  ];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(row=> row.Kursgrupp),
      datasets: [{
        label: 'Fördelning av högskolepoäng',
        data: data.map(row => row.Högskolepoäng),
        backgroundColor: data.map((row, index) => colors[index % colors.length]),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Fördelning av högskolepoäng',
          font: {
            size: 16
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}