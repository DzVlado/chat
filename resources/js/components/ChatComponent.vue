<template>
    <div>
        <div class="card-body scroll" id="messages">
            <div v-for="message in this.messages" :key="message.id" class="alert alert-success"
                 :class="{ 'me': user.id == message.user_id }">
            <span class="name">
                <p v-if="user.id == message.user_id">Me:</p>
                <p v-else>{{ message.user.name }}:</p>
            </span>
                <p class="body">
                    {{ message.body }}
                </p>
            </div>
        </div>
        <div class="card-footer">
            <form @submit.prevent="sendMessage()">
                <div class="form-group">
                    <div class="row">
                        <textarea v-model="body" name="body" id="body" placeholder="Message body"
                                  class="form-control col-md-10" maxlength="191"></textarea>
                        <button class="btn btn-success col-md-2" type="submit">Send</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client';
    export default {
        data() {
            return {
                user: {},
                messages: {},
                body: '',
                socket : io('chat.local:3000')
            }
        },
        methods: {
            sendMessage() {
                if(this.body != ''){
                    axios.post('/messages', {
                        body: this.body,
                        user_id: user.id
                    });

                    let newMessage = {
                        body: this.body,
                        user_id: this.user.id,
                        user: this.user
                    };

                    this.messages.push(newMessage);
                    this.body = '';

                    this.socket.emit('Created', newMessage);

                    this.scrollToEnd();
                }
            },
            scrollToEnd: function() {
                $("#messages").animate({ scrollTop: $('#messages').prop("scrollHeight")}, 1000);
            }
        },
        created() {
            this.user = user;
            axios.get('/messages')
                .then(response => {
                    this.messages = response.data;
                });

            this.socket.on('Created', (data) => {
                this.messages.push(data);
                this.scrollToEnd();
            });
        }
    }
</script>
<style>
    .me{
        text-align: right;
        background-color: #fffbdb;
    }

    .name{
        font-size: 20px;
        font-weight: 600;
    }

    .body{
        font-size: 15px;
    }

    .scroll {
        max-height: 400px;
        overflow-y: auto;
    }
</style>