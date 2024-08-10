const { createApp, defineComponent } = Vue

const ones = [
    [],
    [1, 2, 3, 4, 5, 6, 7],
    [29, 19, 30, 9, 31, 22, 32, 33],
    [17, 15, 18, 19, 20, 21, 22, 23, 24, 25],
    [13, 2, 3, 4, 5, 6, 7]
]

const fives = [
    [],
    [4, 8, 9, 10, 11, 12],
    [33, 34, 24, 35, 6, 36, 27, 37],
    [21, 22, 23, 24, 25, 26, 27, 28],
    [14, 15, 16, 10, 11, 4, 12]
]

const template = `
    <svg viewBox="0 0 360 320">
        <!-- Frame -->
        <path v-if="isFirstDigit" class="segment" :class="{ on: on !== null }" d="M360,20V0H0v20h20v280H0v20h360v-20h-20V20h20ZM320,300H40V20h280v280Z"></path>
        <polygon v-else class="segment" :class="{ on: on !== null }" points="360 20 360 0 64.19 0 64.19 20 320 20 320 300 64.19 300 64.19 320 360 320 360 300 340 300 340 20 360 20" />

        <!-- Vertical Center -->
        <rect class="segment" :class="{ on: on && on.includes(1) }" x="170" y="24" width="20" height="62"><title>1</title></rect>
        <rect class="segment" :class="{ on: on && on.includes(2) }" x="170" y="90" width="20" height="20"><title>2</title></rect>
        <rect class="segment" :class="{ on: on && on.includes(3) }" x="170" y="114" width="20" height="32"><title>3</title></rect>
        <rect class="segment" :class="{ on: on && on.includes(4) }" x="170" y="150" width="20" height="20"><title>4</title></rect>
        <path class="segment" :class="{ on: on && on.includes(5) }" d="M190,230.23v-56.23h-20v56.23c3.43-.16,6.8-.23,10-.23s6.64.08,10,.23Z"><title>5</title></path>
        <path class="segment" :class="{ on: on && on.includes(6) }" d="M190,254.25v-20.02c-3.31-.15-6.65-.23-10-.23s-6.68.09-10,.24v20.04c3.32-.17,6.65-.27,10-.27s6.68.08,10,.25Z"><title>6</title></path>
        <path class="segment" :class="{ on: on && on.includes(7) }" d="M190,258.25h-.2c-3.26-.17-6.56-.25-9.8-.25-2.98,0-6.19.09-9.8.27h-.2v37.73h20v-37.75Z"><title>7</title></path>
        
        <!-- Horizontal Center -->
        <path class="segment" :class="{ on: on && on.includes(8) }" d="M44,170h37.75v-.2c.17-3.26.25-6.56.25-9.8s-.08-6.54-.24-9.8v-.2h-37.76v20Z"><title>8</title></path>
        <path class="segment" :class="{ on: on && on.includes(9) }" d="M105.77,170c.15-3.31.23-6.65.23-10s-.08-6.69-.23-10h-20.02c.17,3.32.25,6.65.25,10s-.08,6.68-.25,10h20.02Z"><title>9</title></path>
        <rect class="segment" :class="{ on: on && on.includes(10) }" x="110" y="150" width="20" height="20"><title>10</title></rect>
        <rect class="segment" :class="{ on: on && on.includes(11) }" x="134" y="150" width="32" height="20"><title>11</title></rect>
        <rect class="segment" :class="{ on: on && on.includes(12) }" x="194" y="150" width="122" height="20"><title>12</title></rect>

        <!-- Horizontal Right -->
        <rect class="segment" :class="{ on: on && on.includes(13) }" x="194" y="90" width="122" height="20"><title>13</title></rect>

        <!-- Vertical Top -->
        <polygon class="segment" :class="{ on: on && on.includes(14) }" points="130 24 110 24 110 46.06 130 26.06 130 24"><title>14</title></polygon>
        <polygon class="segment" :class="{ on: on && on.includes(15) }" points="130 31.72 110 51.72 110 80 130 60 130 31.72"><title>15</title></polygon>
        <polygon class="segment" :class="{ on: on && on.includes(16) }" points="130 65.66 110 85.66 110 146 130 146 130 65.66"><title>16</title></polygon>

        <!-- Top Left Diagonal -->
        <polygon class="segment" :class="{ on: on && on.includes(17) }" points="137.72 24 134 27.72 134 56 166 24 137.72 24"><title>17</title></polygon>
        <path class="segment" :class="{ on: on && on.includes(18) }" d="M98.95,91.05l7.05-7.05v-28.28l-14.91,14.91.63,1.44c2.69,6.15,5.1,12.53,7.23,18.99Z"><title>18</title></path>
        <path class="segment" :class="{ on: on && on.includes(19) }" d="M79.66,110.34l16.13-16.13c-2.24-7.01-4.82-13.87-7.74-20.55l-15.31,15.31c2.73,7.01,5.03,14.13,6.92,21.36Z"><title>19</title></path>
        <path class="segment" :class="{ on: on && on.includes(20) }" d="M75.79,111.35c-1.7-6.5-3.78-12.97-6.16-19.26l-25.63,25.63v28.28l32.38-32.38-.59-2.27Z"><title>20</title></path>
        
        <!-- Bottom Left Diagonal -->
        <path class="segment" :class="{ on: on && on.includes(21) }" d="M75.79,208.65l.59-2.27-32.38-32.38v28.28l25.63,25.63c2.38-6.3,4.46-12.76,6.16-19.26Z"><title>21</title></path>
        <path class="segment" :class="{ on: on && on.includes(22) }" d="M79.66,209.66c-1.89,7.23-4.19,14.36-6.92,21.36l15.31,15.31c2.92-6.68,5.5-13.54,7.74-20.55l-16.13-16.13Z"><title>22</title></path>
        <path class="segment" :class="{ on: on && on.includes(23) }" d="M91.45,248.55l.61-.27c6.15-2.69,12.53-5.1,18.99-7.23l-12.1-12.1c-2.13,6.45-4.55,12.83-7.23,18.99l-.27.61Z"><title>23</title></path>
        <path class="segment" :class="{ on: on && on.includes(24) }" d="M130.34,260.34l-16.13-16.13c-7.01,2.24-13.87,4.82-20.55,7.74l15.31,15.31c7.01-2.73,14.13-5.03,21.36-6.92Z"><title>24</title></path>
        <path class="segment" :class="{ on: on && on.includes(25) }" d="M131.35,264.21c-6.5,1.7-12.97,3.78-19.27,6.16l25.63,25.63h28.28l-32.38-32.38-2.27.59Z"><title>25</title></path>
        
        <!-- Bottom Right Diagonal -->
        <path class="segment" :class="{ on: on && on.includes(26) }" d="M269.37,248.91l46.63-46.63v-28.28l-67.05,67.05c6.43,2.12,12.81,4.54,18.99,7.23l1.44.63Z"><title>26</title></path>
        <path class="segment" :class="{ on: on && on.includes(27) }" d="M229.67,260.33c7.23,1.89,14.35,4.2,21.35,6.93l15.31-15.31c-6.68-2.91-13.54-5.5-20.55-7.74l-16.11,16.11Z"><title>27</title></path>
        <path class="segment" :class="{ on: on && on.includes(28) }" d="M247.92,270.37c-6.35-2.4-12.82-4.49-19.26-6.17l-2.27-.59-32.39,32.39h28.28l25.63-25.63Z"><title>28</title></path>
        
        <!-- Left Curve -->
        <path class="segment" :class="{ on: on && on.includes(29) }" d="M71.11,84.95l15.17-15.17c-7.58-16.48-17.15-31.85-28.44-45.78h-13.83v14.68c10.83,13.72,19.74,28.78,26.6,44.98.18.43.34.86.52,1.28Z"><title>29</title></path>
        <path class="segment" :class="{ on: on && on.includes(30) }" d="M80.79,114.87c2.4,10.19,3.98,20.59,4.71,31.13h20.05c-1.05-16.38-3.94-32.26-8.44-47.45l-16.32,16.32Z"><title>30</title></path>
        <path class="segment" :class="{ on: on && on.includes(31) }" d="M105.52,174h-20.02c-.74,10.54-2.32,20.93-4.72,31.13l16.33,16.33c4.5-15.19,7.36-31.08,8.41-47.46Z"><title>31</title></path>
        <path class="segment" :class="{ on: on && on.includes(32) }" d="M81.28,253.35l4.64-2.33c.12-.26.25-.52.37-.79l-15.17-15.18c-.18.43-.34.86-.52,1.28-5.29,12.51-11.82,24.31-19.5,35.36,9.55-6.9,19.66-13.06,30.19-18.35Z"><title>32</title></path>
        <path class="segment" :class="{ on: on && on.includes(33) }" d="M57.84,296c9.75-12.02,18.22-25.12,25.24-39.08-13.96,7.02-27.05,15.49-39.08,25.24v13.83h13.84Z"><title>33</title></path>
        
        <!-- Bottom Curve -->
        <path class="segment" :class="{ on: on && on.includes(34) }" d="M88.98,254.08l-2.33,4.64c-5.29,10.52-11.43,20.62-18.33,30.16,11.04-7.67,22.85-14.19,35.34-19.47.43-.18.86-.34,1.28-.52l-15.18-15.17c-.26.12-.52.25-.79.37Z"><title>34</title></path>
        <path class="segment" :class="{ on: on && on.includes(35) }" d="M134.87,259.21c10.19-2.4,20.59-3.95,31.13-4.69v-20.06c-16.38,1.05-32.26,3.94-47.45,8.44l16.32,16.32Z"><title>35</title></path>
        <path class="segment" :class="{ on: on && on.includes(36) }" d="M241.44,242.9c-15.19-4.5-31.06-7.4-47.44-8.45v20.04c10.55.74,20.94,2.31,31.14,4.71l16.31-16.31Z"><title>36</title></path>
        <path class="segment" :class="{ on: on && on.includes(37) }" d="M270.21,253.73l-15.16,15.16c.43.18.86.34,1.28.52,16.2,6.85,31.24,15.77,44.96,26.6h14.71v-13.84c-13.93-11.29-29.31-20.86-45.79-28.44Z"><title>37</title></path>
    </svg>
`

const Digit = defineComponent({
    template,
    props: ['isFirstDigit', 'value'],

    computed: {
        on() {
            if (this.value === null) {
                return null
            }

            if (this.value === 0) {
                return [4]
            }
    
            const fivesIndex = Math.floor(this.value / 5)
            const onesIndex = this.value % 5
            return [...ones[onesIndex], ...fives[fivesIndex]]
        }
    }
})

createApp({
    components: {
        Digit
    },

    data() {
        return {
            number: 0
        }
    },

    computed: {
        digits() {
            if (this.number === null) return [null, null, null, null, null]

            let number = this.number
            const digits = []

            for (let i = 0; i < 5; i++) {
                if (number === 0 && i !== 0) digits.push(null)
                else digits.unshift(number % 25)

                number = Math.floor(number / 25)
            }

            return digits
        }
    },

    methods: {
        onNumberClick(number) {
            this.number = number
        }
    }
}).mount('#app')
