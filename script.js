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

    // Add click event to the span for playing animation
    const videoSpan = document.querySelector('.intervjuer span');
    let playAudio=false;
    let firstIntervju= new Audio('assests/August_Persson_2B.mp3');
    if (videoSpan) {
        videoSpan.addEventListener('click', function() {
            
            if(playAudio===false){
                videoSpan.style.backgroundImage = "url('assests/play_Filip.gif')";
                playAudio=true;
                firstIntervju.play();
                
            setTimeout(function() {
                videoSpan.style.backgroundImage = "url('assests/slut_Filip.jpg')";
            }, 150);
            }
            else{
                videoSpan.style.backgroundImage = "url('assests/stop_Filip.gif')";
                playAudio=false;
                firstIntervju.pause();
                setTimeout(function() {
                videoSpan.style.backgroundImage = "url('assests/start_Filip.jpg')";
            }, 150);
            }
        });

        videoSpan.addEventListener('mouseout', function() {
            if (playAudio === false) {
                videoSpan.style.backgroundImage = "url('assests/Filip.jpg')";
            }
        });
        videoSpan.addEventListener('mouseenter', function() {
            if (playAudio === false) {
                videoSpan.style.backgroundImage = "url('assests/start_Filip.jpg')";
            }
        });

        // Reset when audio ends
        firstIntervju.addEventListener('ended', function() {
            playAudio = false;
            videoSpan.style.backgroundImage = "url('assests/Filip.jpg')";
        });
    }
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
        onClick: (event, activeElements) => {
          if (activeElements.length > 0) {
            const index = activeElements[0].index;
            const label = data[index].Kursgrupp;
            const value = data[index].Högskolepoäng;
            console.log(`Bar clicked: ${label} - ${value} HP`);
            showCourse(label);
          }
        },
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



function showCourse(course){
    fetch('kurser.json')
    .then(function(response) {
        if(response.ok) {
            return response.json();
        }
    })
    .then(function(data) {
        const courses = data[0];
        const matchingCourses = courses.filter(c => c.Kursgrupp === course);
                
        alert(`Kurser i ${course}:\n\n${matchingCourses.map(c => c.Kurs).join('\n')}`);
        
        console.log(`Courses in ${course}:`, matchingCourses);
    });
}