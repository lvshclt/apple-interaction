(() => {
  let yOffset = 0;
  let prevScrollHeight = 0;
  let currentScene = 0;
  let enterNewScene = false;

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
        messageA_opcity: [0, 1, { start: 0.1, end: 0.2 }],
        messageB_opcity: [0, 1, { start: 0.3, end: 0.4 }],
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
  function calcValues(values, currentYoffset) {
    let rv;
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYoffset / scrollHeight;
    if (values.length === 3) {
      const partScrollStart = values[2].start * scrollHeight;
      const partScrollEnd = values[2].end * scrollHeight;
      const partScrollHeight = partScrollEnd - partScrollStart;
      const partScrollRatio =
        (currentYoffset - partScrollStart) / partScrollHeight;
      switch (true) {
        case currentYoffset < partScrollStart:
          rv = values[0];
          break;
        case currentYoffset > partScrollEnd:
          rv = values[1];
          break;
        default:
          rv = partScrollRatio * (values[1] - values[0]) + values[0];
          break;
      }
    } else {
      rv = scrollRatio * (values[1] - values[0]) + values[0];
    }
    return rv;
  }

  function playAnimation() {
    const objs = sceneInfo[currentScene].objs;
    const values = sceneInfo[currentScene].values;
    const currentYoffset = yOffset - prevScrollHeight;

    switch (currentScene) {
      case 0:
        let messageA_opacity_in = calcValues(
          values.messageA_opcity,
          currentYoffset
        );
        objs.messageA.style.opacity = messageA_opacity_in;
        // console.log(currentScene, messageA_opacity_in);
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
    enterNewScene = false;

    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollHeight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
      enterNewScene = true;
      currentScene++;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (yOffset < prevScrollHeight) {
      if (yOffset < 0) return;
      enterNewScene = true;
      currentScene--;
      document.body.setAttribute('id', `show-scene-${currentScene}`);
    }
    if (enterNewScene) return;
    playAnimation();
  }
  window.addEventListener('scroll', () => {
    yOffset = window.pageYOffset;
    scrollLoop();
  });
  window.addEventListener('load', setLayout);
  window.addEventListener('resize', setLayout);
})();
