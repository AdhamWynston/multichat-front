<template>
    <div class="masthead">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Chatroom
                        <span class="badge pull-right"> TESTANDO </span>
                    </div>
                    <send-message></send-message>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import env from "../../env"
    import sendMessage from './sendMessage'
    export default {
        name: "invoice",
        data() {
            return {
            }
        },
        created: function() {
        },
        mounted: function() {
        },
        computed: {
        },
        methods: {
            formatDate(date) {
                let d = new Date(date)
                return (d.getDate()+1).toLocaleString('pt-BR', { minimumIntegerDigits:2 })+'/'+ (d.getMonth()+1).toLocaleString('pt-BR', { minimumIntegerDigits:2 })+'/'+ d.getFullYear()
            },
        },
        components: {
            sendMessage
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700|Source+Sans+Pro:400,700');
    .bank_slip {
        font-family: 'Open Sans', sans-serif;
    }
    button.teste {
        background-color: yellow;
    }
    .fancy {
        width: 800px;
        margin: 20px auto;
        padding: 20px;
        border-style: solid;
    }
    .header {
        background: #EFEFEF;
        padding: 15px 0;
        margin: 0 0 20px 0;
    }
    .container {
        max-width: 800px;
    }
    .account {
        height: 70px;
        line-height: 60px;
        text-align: center;
        overflow: hidden;
    }
    .account span {
        display: inline-block;
        vertical-align: middle;
        line-height: normal;
        font-size:20px;
        font-weight: bold;
    }
    .info {
        padding: 0 5px 0 5px;
    }
    .info .item {
        margin: 0 0 8px 0;
    }
    .info .item:last-child {
        margin:0;
    }
    .info .item .title {
        text-transform: uppercase;
        font-size: 10px;
        line-height: 10px;
        font-weight: bold;
    }
    .info .item .value {
        font-size: 14px;
    }

    .block-title {
        color:#333;
        padding: 0 5px 0 5px;
    }

    .block-title h1.title {
        font-size: 28px;
        line-height: 22px;
        margin:0 0 5px 0;
        color:aliceblue;
    }
    .block-title .instructions {
        font-size: 11px;
    }

    .details .due {
        text-align: right;
        margin:0 0 10px 0;
    }
    .details .due .title {
        text-transform: uppercase;
        font-size: 10px;
        line-height: 10px;
    }
    .details .due .date {
        font-weight: bold;
        font-size: 23px;
    }

    .details .table {
        font-size: 13px;
    }
    .details .table th {
        padding: 5px 5px 3px;
        border-top: none;
        color: #A5A4A5;
    }
    .details .table td {
        padding: 5px 5px 3px;
    }
    .details .table .total {
        font-size: 18px;
        font-weight: bolder;
        padding: 10px 5px 6px;
    }

    .divisor {
        border-top: 1px dashed #ccc;
        width: 100%;
        margin-top: 10px;
        padding: 10px 0;
    }

    .slip .digitable_line input {
        width: 100%;
        text-align: center;
        font-size: 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }
    .slip .actions {
        text-align: center;
        margin-bottom: 20px;
    }

    .footer {
        font-size: 13px;
    }


    @media (max-width: 575px) {
        .account {
            display: none;
        }
    }

    .masthead {
        font-family: 'Source Sans Pro', sans-serif;
        padding-top: 6.5%;
        padding-bottom: 2%;
        width: 100%;
        height: 100vh;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: radial-gradient(ellipse at center, #D85A61 0%, #B10E0E 100%);
        overflow-y: auto;
        color: #FFF;
    }
    .masthead h1 {
        font-size: 50px;
        margin: 0;
        padding: 0;
        font-weight: bold;
    }
    .masthead h3 {
        font-style: italic;
        margin: 0;
        padding: 0;
    }
    @media (min-width: 992px) {
        .masthead h1 {
            font-size: 60px;
        }
    }
</style>