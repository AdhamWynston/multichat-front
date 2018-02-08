<template>
    <div class="chat-composer">
        <input
                id="message"
                type="text"
                placeholder="Digite sua mensagem..."
                @keyup.enter="submitMessage"
                v-model="messageText">
        <button
                class="btn btn-primary"
                @click="submitMessage">
            Enviar
        </button>
    </div>
</template>

<script>
    export default {
        name: "send-message",
        data () {
            return {
                messageText: ''
            }
        },
        methods: {
            submitMessage() {
                console.log('oi')
                // this.$emit('messagesent', {
                //     message: this.messageText,
                //     user: 'Adham'
                // })
                // this.messageText = ''
            }
        }
    }
</script>

<style lang="css">
    .chat-composer {
        display: flex;
    }

    .chat-composer input {
        flex: 1 auto;
        padding: .5rem 1rem;
    }

    .chat-composer button {
        border-radius: 0;
    }
</style>