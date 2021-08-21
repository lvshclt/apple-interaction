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
        messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
        messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
        messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
        messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
        // messageB_opacity: [0, 1, { start: 0.3, end: 0.4 }],
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
      if (sceneInfo[i].type === 'sticky')
        sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
      else if (sceneInfo[i].type === 'normal')
        sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;

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
        case currentYoffset < partScrollStart: // 전
          rv = values[0];
          break;
        case currentYoffset > partScrollEnd: // 후
          rv = values[1];
          break;
        default:
          // 중간
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
    const scrollHeight = sceneInfo[currentScene].scrollHeight;
    const scrollRatio = currentYoffset / scrollHeight;

    switch (currentScene) {
      case 0:
        // const messageA_opacity_in = calcValues(
        //   values.messageA_opacity_in,
        //   currentYoffset
        // );
        // const messageA_opacity_out = calcValues(
        //   values.messageA_opacity_out,
        //   currentYoffset
        // );
        // const messageA_translateY_in = calcValues(
        //   values.messageA_translateY_in,
        //   currentYoffset
        // );
        // const messageA_translateY_out = calcValues(
        //   values.messageA_translateY_out,
        //   currentYoffset
        // );

        if (scrollRatio <= 0.22) {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_in,
            currentYoffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_in,
            currentYoffset
          )}%)`;
        } else {
          objs.messageA.style.opacity = calcValues(
            values.messageA_opacity_out,
            currentYoffset
          );
          objs.messageA.style.transform = `translateY(${calcValues(
            values.messageA_translateY_out,
            currentYoffset
          )}%)`;
        }
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
