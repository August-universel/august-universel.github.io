const imageSources = [
    '/assests/play_Filip.gif', 
    '/assests/stop_Filip.gif',
    '/assests/play_August.gif', 
    '/assests/stop_August.gif',
    '/assests/start_Filip.jpg',
    '/assests/slut_filip.jpg',
    '/assests/start_August.jpg',
    '/assests/slut_August.jpg',
    '/assests/Filip.jpg',
    '/assests/August.jpg',
    '/assests/slideshow1.jpg',
    '/assests/slideshow2.jpg',
    '/assests/slideshow3.jpg'
];

const preloadCache = [];

imageSources.forEach(src => {
    const img = new Image();
    img.src = src;
    preloadCache.push(img); 
});

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
// Add click event to the span for playing animation
const filipPicture = document.getElementById('firstIntervju');
let playingFilipsIntervju=false;
let firstIntervju= new Audio('/assests/Filip_Audio.mp3');
if (filipPicture) {
    filipPicture.addEventListener('click', function() {
        
        if(playingFilipsIntervju===false){
            filipPicture.style.backgroundImage = "url('/assests/play_Filip.gif')";
            playingFilipsIntervju=true;
            firstIntervju.play();
            
        setTimeout(function() {
            filipPicture.style.backgroundImage = "url('/assests/slut_filip.jpg')";
        }, 150);
        } 
        else if(playingFilipsIntervju===true){
            filipPicture.style.backgroundImage = "url('/assests/stop_Filip.gif')";
            playingFilipsIntervju=false;
            firstIntervju.pause();
            setTimeout(function() {
            filipPicture.style.backgroundImage = "url('/assests/start_Filip.jpg')";
        }, 150);
        }
    });

    filipPicture.addEventListener('mouseout', function() {
        if (playingFilipsIntervju === false) {
            filipPicture.style.backgroundImage = "url('/assests/Filip.jpg')";
        }
    });
    filipPicture.addEventListener('mouseenter', function() {
        if (playingFilipsIntervju === false) {
            filipPicture.style.backgroundImage = "url('assests/start_Filip.jpg')";
        }
    });

    // Reset when audio ends
    firstIntervju.addEventListener('ended', function() {
        playingFilipsIntervju = false;
        filipPicture.style.backgroundImage = "url('/assests/Filip.jpg')";
    });
}

let playingAugustsIntervju=false;
let secondIntervju= new Audio('/assests/August_Audio.mp3');

const secondIntervjuPicture = document.getElementById('secondIntervju');
if(secondIntervjuPicture){
    secondIntervjuPicture.addEventListener('click', function() {

            if(playingAugustsIntervju===false){
                secondIntervjuPicture.style.backgroundImage = "url('/assests/play_August.gif')";
                playingAugustsIntervju=true;
                secondIntervju.play();
                
            setTimeout(function() {
                secondIntervjuPicture.style.backgroundImage = "url('/assests/slut_August.jpg')";
            }, 150);
            } 
            else if(playingAugustsIntervju===true){
                secondIntervjuPicture.style.backgroundImage = "url('/assests/stop_August.gif')";
                playingAugustsIntervju=false;
                secondIntervju.pause();
                setTimeout(function() {
                secondIntervjuPicture.style.backgroundImage = "url('/assests/start_August.jpg')";
            }, 150);
            }
        });
        secondIntervjuPicture.addEventListener('mouseout', function() {
            if (playingAugustsIntervju === false) {
                secondIntervjuPicture.style.backgroundImage = "url('/assests/August.jpg')";
            }
        });
        secondIntervjuPicture.addEventListener('mouseenter', function() {
            if (playingAugustsIntervju === false) {
                secondIntervjuPicture.style.backgroundImage = "url('/assests/start_August.jpg')";
            }
        });
        secondIntervju.addEventListener('ended', function() {
        playingAugustsIntervju = false;
        secondIntervjuPicture.style.backgroundImage = "url('/assests/August.jpg')";
    });

}

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
        onHover: (event, activeElements) => {
          if (activeElements.length > 0) {
            const index = activeElements[0].index;
            const label = data[index].Kursgrupp;
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



function showCourse(course) {
    fetch('kurser.json')
    .then(response => response.json())
    .then(data => {
        const courses = data[0];
        const matchingCourses = courses.filter(c => c.Kursgrupp === course);
        
        const detailsDiv = document.getElementById('courseDetails');
        const listUl = document.getElementById('courseList');
        
        detailsDiv.querySelector('h1').innerText = `Kurser i ${course}`;
        detailsDiv.querySelector('p').innerText = "Följande kurser ingår i denna grupp:";
        listUl.innerHTML = matchingCourses.map(c => `<li>${c.Kurs}</li>`).join('');
    });
}