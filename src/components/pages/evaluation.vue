<template>
    <div class="masthead">
        <div v-if="order">
            <div>
                <div class="header">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-8 col-sm-6 offset-4">
                                <div class="text-dark">
                                    <h2><strong>Avalie sua Compra</strong></h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="details">
                    <div class="container">

                        <div class="row block-title">
                            <div class="col-sm-12">
                                <h1 class="title">Olá, {{ order.customer_name }}!</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="fancy">
                                <div class="row">
                                    <div class="col-sm-3">
                                        Compra em {{ formatDate(order.reference_created_at)}}
                                    </div>
                                    <div class="col-sm-3">
                                        Entrega em {{ formatDate(order.reference_delivered_at)}}
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-4">
                                        Loja {{ order.product.merchant_name }}
                                    </div>
                                </div>
                                <div class="col-sm-4">
                                    <a class="" href="#">
                                        <img class="media-object" src="http://placehold.it/64x64">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Experiência geral de compra</h4>
                                <star-rating :star-size="50" :border-width="3" v-model="experience_rate"> </star-rating>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Qualidade do produto</h4>
                                <star-rating :star-size="50" :border-width="3" v-model="product_rate"> </star-rating>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                    <h4>Entrega do produto</h4>
                                    <star-rating :star-size="50" :border-width="3" v-model="shipment_rate"> </star-rating>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Comentários sobre o produto ou compra (opcional)</h4>
                                <textarea v-model="comments" class="form-control" rows="5" id="comment"></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12">
                                <h4>Probabilidade de recomendar para um amigo</h4>
                                <!--<star-rating :border-width="3" :max-rating="10" :star-size="40" v-model="nps"> </star-rating>-->
                                <button v-for="index in 10" v-bind:class="{ active: nps === index, teste: nps === index}" type="button" @click="check(index)" :id="index" class="btn btn-info">{{ index }}</button>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-sm-12" align="center">
                                <button @click="submit()" type="button" class="btn btn-light">Enviar Avaliação</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="error === null">
            <preloader></preloader>
        </div>

        <div class="masthead" v-if="error">
            <div class="container text-center">
                <div v-if="error === 'notFound'">
                    <h1 class="mb-3">Página não Encontrada</h1>
                    <h3>Verifique se o link está correto e tente novamente</h3>
                </div>
                <div v-else>
                    <h1 class="mb-3">Ocorreu um Erro</h1>
                    <h3>Ops, por favor tente novamente</h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    import preloader from "../layout/preloader"
    import starRating from 'vue-star-rating'
    import env from "../../env"
    import 'clientjs'

    export default {
        name: "invoice",
        data() {
            return {
                error: null,
                order: null,
                customer_name: '',
                experience_rate: 0,
                product_rate: 0,
                shipment_rate: 0,
                comments: '',
                nps: 0,
                fingerprint: null
            }
        },
        created: function() {
            this.getFingerPrint()
        },
        mounted: function() {
            this.getEvaluation()
        },
        computed: {
        },
        methods: {
            check (value) {
                this.nps = value
            },
            getFingerPrint() {
                let client = new ClientJS()
                this.fingerprint = client.getFingerprint().toString()
            },
            submit() {
                let data = {
                    experience_rate: this.experience_rate,
                    product_rate: this.product_rate,
                    shipment_rate: this.shipment_rate,
                    comments: this.comments,
                    nps: this.nps,
                    ip: '251.149.209.205',
                    fingerprint: this.fingerprint
                }
              axios.put(env.apiUrl+ '/v1/orders/' + this.$route.params.secure_id, data)
                  .then((response) => {
                      this.$router.push('/congratulations')
                  })
                  .catch((response) => {
                      // console.log(response)
                  })
            },
            getEvaluation() {
                axios.get(env.apiUrl+ '/v1/orders/' + this.$route.params.secure_id)
                    .then((response) => {
                        this.error = false
                        console.log(response.data)
                        this.order = response.data
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response && error.response.status == 404) {
                            document.title = "Página não Encontrada"
                            this.error = 'notFound'
                        } else {
                            document.title = "Erro Interno"
                            this.error = "other"
                            setTimeout(() => {
                                this.getEvaluation()
                            }, 10000)
                        }
                    })
            },
            formatDate(date) {
                let d = new Date(date)
                return (d.getDate()+1).toLocaleString('pt-BR', { minimumIntegerDigits:2 })+'/'+ (d.getMonth()+1).toLocaleString('pt-BR', { minimumIntegerDigits:2 })+'/'+ d.getFullYear()
            },
        },
        components: {
            preloader,
            starRating
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