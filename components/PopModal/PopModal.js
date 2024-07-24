Component({
    properties: {
        // 是否显示
        isShow: {
            type: Boolean,
            value: false
        },
        // 标题
        title: {
            type: String,
            value: ''
        },
        // 确定按钮文案
        confirmText: {
            type: String,
            value: ''
        },
      
    },
    observers: {
        isShow: function (bool) {
            if (bool) {
                let animation = wx.createAnimation({
                    duration: 100,
                    timingFunction: "ease"
                });
                let animationOpacity = wx.createAnimation({
                    duration: 500,
                    timingFunction: "ease"
                });
                setTimeout(() => {
                    animation.bottom(0).step();
                    animationOpacity.opacity(0.5).step();
                    this.setData({
                        animationOpacity: animationOpacity.export(),
                        animationData: animation.export()
                    })
                }, 0);
            } else {
                let animation = wx.createAnimation({
                    duration: 100,
                    timingFunction: "ease"
                });
                let animationOpacity = wx.createAnimation({
                    duration: 500,
                    timingFunction: "ease"
                });
                animation.bottom(-320).step();
                animationOpacity.opacity(0).step();
                this.setData({
                    animationOpacity: animationOpacity.export(),
                    animationData: animation.export()
                });
            }
        }

    },
    methods: {
        // 显示弹层
        onShow() {
            this.setData({
                isShow: true
            });
        },
        // 关闭弹层
        handleHide() {
            this.setData({
                isShow: false,
                _selectId: null
            });
            this.triggerEvent('closeModal');
        },
        // 点击确定
        handleConfirm() {
        
            this.triggerEvent('confirm');
        },
        move() {}

    }
})