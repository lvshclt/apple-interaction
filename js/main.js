(() => {
  let yOffset = 0;
  let prevScrollHeight;
  let currentScene = 0;
  const sceneInfo = [
    //0
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-0'),
        messageA: document.querySelector('#scroll-section-0 .main-message.a'),
        messageB: document.querySelector('#scroll-section-0 .main-message.b'),
        messageC: document.querySelector('#scroll-section-0 .main-message.c'),
        messageD: document.querySelector('#scroll-section-0 .main-message.d'),
      },
      values: {
        messageA_opcity: [0, 1],
      },
    },
    //1
    {
      type: 'normal',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-1'),
      },
    },
    //2
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-2'),
      },
    },
    //3
    {
      type: 'sticky',
      heightNum: 5,
      scrollHeight: 0,
      objs: {
        container: document.querySelector('#scroll-section-3'),
      },
    },
  ];
  function setLayout() {
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
    }

    // 스크롤과 상관없이, 처음 로드하거나 새로고침을 눌렀을때 현재 씬을 알아채는 것
    let totalScrollHeight = 0;
    yOffset = window.pageYOffset;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollHeight;
      if (yOffset <= totalScrollHeight) {
        currentScene = i;
        document.body.setAttribute('id', `show-scene-${currentScene}`);
        break;
      }
    }
  }
  //
  function calcValues(values, currentYoffset) {}

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;

    switch (currentScene) {
      case 0:
        let messageA_opacity_0 = values.messageA_opcity[0];
        let messageA_opacity_1 = values.messageA_opcity[1];
        const currentYoffset = yOffset - prevScrollHeight;
        console.log(
          calcValues(calcValues(values.messageA_opcity, currentYoffset))
        );

        break;

      case 1:
        break;

      case 2:
        break;

      case 3:
        break;
    }
  }
  //
  function scrollLoop() {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (yOffset < 0) return;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    console.log(currentScene);
  }
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
    playAnimation();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();
