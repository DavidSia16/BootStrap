gsap.registerPlugin(ScrollTrigger);

const sectionsList = document.querySelectorAll('.parallax-section');

sectionsList.forEach((section) => {
  const infoText = section.querySelector('.project-info');
  const mockupWrapper = section.querySelector('.project-mockup-wrapper');
  const scrollImg = section.querySelector('.long-screenshot-img'); // Alvo modificado para a IMG

  if (infoText && mockupWrapper) {
    
    // 1. Animação de Entrada das seções laterais
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        end: "bottom center",
        toggleActions: "play none none reverse",
      }
    });

    tl.fromTo(infoText, 
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(mockupWrapper, 
      { opacity: 0, x: 80 },
      { opacity: 1, x: 0, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );

    // 2. Animação de Scroll Automático Preciso
    if (scrollImg) {
      // O 'scrollTrigger' garante que o cálculo rode assim que a página estiver pronta
      ScrollTrigger.addEventListener("refresh", () => {
        const alturaImagem = scrollImg.offsetHeight;
        const alturaJanela = 415; // Altura visível fixa do mockup

        if (alturaImagem > alturaJanela) {
          // Calcula matematicamente o ponto exato da base da imagem
          const pontoFinal = -(alturaImagem - alturaJanela);

          gsap.to(scrollImg, {
            y: pontoFinal,
            duration: 8,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            repeatDelay: 1.5,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              toggleActions: "play pause resume pause"
            }
          });
        }
      });
    }

  }
});

document.addEventListener("DOMContentLoaded", () => {
    const logs = [
        "[INFO]  --- [main] c.d.portfolio.JogoApplication   : Starting JogoApplication v0.0.1...",
        "[INFO]  --- [main] c.d.portfolio.JogoApplication   : Java version: 21.0.2",
        "[INFO]  --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080",
        "[INFO]  --- [main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing Persistence Unit [default]",
        "[INFO]  --- [main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path ''",
        "[INFO]  --- [main] c.d.portfolio.JogoApplication   : Started JogoApplication in 2.45 seconds",
        "[GAME]  --- [Thread-2] c.d.p.service.JogoService   : [System] Novo número secreto gerado com sucesso pelo Spring Boot.",
        "[API]   --- [nio-8080-exec-1] c.d.p.c.JogoController : POST /api/jogo/palpite?numero=50 -> Resposta:  O número secreto é MAIOR.",
        "[API]   --- [nio-8080-exec-2] c.d.p.c.JogoController : POST /api/jogo/palpite?numero=75 -> Resposta:  O número secreto é MENOR.",
        "[API]   --- [nio-8080-exec-3] c.d.p.c.JogoController : POST /api/jogo/palpite?numero=63 -> Resposta:  CORRETO! Jogo finalizado em 3 tentativas."
    ];

    const terminal = document.getElementById("terminal-decorativo");
    let linhaAtual = 0;

    function simularLogs() {
        if (linhaAtual < logs.length) {
            const p = document.createElement("p");
            p.style.margin = "0 0 8px 0";
            
            // Destaca a palavra INFO, GAME ou API para ficar idêntico ao Spring Boot
            let texto = logs[linhaAtual];
            texto = texto.replace("[INFO]", "<span style='color: #34d399;'>[INFO]</span>");
            texto = texto.replace("[GAME]", "<span style='color: #60a5fa;'>[GAME]</span>");
            texto = texto.replace("[API]", "<span style='color: #f43f5e;'>[API]</span>");
            
            p.innerHTML = texto;
            terminal.appendChild(p);
            linhaAtual++;
            
            // Mantém o scroll sempre no final do terminal
            terminal.parentElement.scrollTop = terminal.parentElement.scrollHeight;
            
            // Intervalo de tempo realista entre um log e outro (1 a 2 segundos)
            setTimeout(simularLogs, Math.random() * 1000 + 1000);
        } else {
            // Quando os logs terminarem, limpa o painel e recomeça o loop infinitamente
            setTimeout(() => {
                terminal.innerHTML = "";
                linhaAtual = 0;
                simularLogs();
            }, 5000);
        }
    }

    simularLogs();
});