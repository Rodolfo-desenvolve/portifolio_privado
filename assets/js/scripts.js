// efeito de rolagem de tela complementar //

const elementScroll = document.querySelector('#scrolling');
const elementContainer = document.querySelector('.icons-scrolling');

let elementChild = Array.from(elementContainer.children);

elementChild.forEach(item => {
    let elementDuplicate = item.cloneNode(true);
    elementContainer.appendChild(elementDuplicate)
})

// slide de projetos (rolagem de projetos) //

const btnNext = document.getElementById('nextSlide')
const btnPrevious = document.getElementById('previousSlide')
const slider = document.querySelector('.slider')
const elementContext = document.querySelector('.element-context')

btnNext.addEventListener('click', controlslider)
btnPrevious.addEventListener('click', controlslider)

const { width: slidewidth } = window.getComputedStyle(slider)
const { width: contextwidth } = window.getComputedStyle(elementContext)

let currentSlide = 0

const slideProps = {
    width: parseInt(slidewidth),
    scroll: 0,
}

function setCurrentDot() {
    const dots = document.querySelectorAll('.dot')
    for (let dot of dots) {
        dot.classList.remove('current')
    }
    dots[currentSlide].classList.add('current')
}

function controlslider({ target: { id } }) {
    const contextlenght = elementContext.children.length;
    switch (id) {
        case 'nextSlide':
            if (slideProps.scroll + slideProps.width < parseInt(contextwidth)) {
                slideProps.scroll += slideProps.width;
            }
            if (currentSlide < contextlenght - 1) {
                currentSlide += 1;
                setCurrentDot()
            }

            return slider.scrollLeft = slideProps.scroll;

        case 'previousSlide': {
            if (currentSlide > 0) {
                currentSlide -= 1;
                setCurrentDot()
            }
            slideProps.scroll = slideProps.scroll - slideProps.width < 0 ? 0 : slideProps.scroll - slideProps.width;
            return slider.scrollLeft = slideProps.scroll;
        }
        default:
            break;
    }
}

window.onload = () => {
    const contextlenght = elementContext.children.length;
    for (let index = 0; index < contextlenght - 1; index += 1) {
        const newdot = slider.parentElement.querySelector('.dot').cloneNode()
        slider.parentElement.querySelector('.length-dots').appendChild(newdot)
    }
    setCurrentDot();
}

// efeito do background da tela //

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('animated-background') });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BufferGeometry();
const vertices = [];
for (let i = 0; i < 500; i++) {
    vertices.push((Math.random() - 0.5) * 4);
    vertices.push((Math.random() - 0.5) * 4);
    vertices.push((Math.random() - 0.5) * 4);
}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

const material = new THREE.PointsMaterial({ color: 0x4ecd, size: 0.02 });
const points = new THREE.Points(geometry, material);
scene.add(points);

camera.position.z = 2;

function animate() {
    requestAnimationFrame(animate);
    points.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();

// animação do sobre mim card abrindo suave //

document.querySelectorAll('.faq-toggle').forEach(button => {

    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target'); // Obtém o ID da resposta
        const content = document.getElementById(targetId); // Seleciona a div correta

        if (content.classList.contains('show')) {
            content.style.maxHeight = '0px';
            content.classList.remove('show');
            button.textContent = '+';
        } else {
            content.classList.add('show');
            content.style.maxHeight = content.scrollHeight + 'px'; // Ajusta o tamanho dinamicamente
            button.textContent = '-';
        }
    });
});