<template>
    <v-container fluid>
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-card>
                    <v-layout wrap>
                        <v-flex xs12 md12>
                            <v-form>
                                <v-container>
                                    <v-layout justify-center>
                                        <v-flex xs6 md6>
                                            <v-text-field
                                                    outline
                                                    v-model="title"
                                                    :rules="loginRules"
                                                    label="Название"
                                                    required>

                                            </v-text-field>

                                            <v-text-field
                                                    outline
                                                    v-model="author"
                                                    :rules="loginRules"
                                                    label="Автор"
                                                    required>

                                            </v-text-field>

                                            <v-textarea
                                                    outline
                                                    v-model="about"
                                                    name="about"
                                                    label="Описание"
                                                    :rules="loginRules"
                                                    rows="3"
                                            ></v-textarea>

                                            <v-text-field
                                                    outline
                                                    v-model="price"
                                                    :rules="loginRules"
                                                    label="Цена"
                                                    type="number"
                                                    required>

                                            </v-text-field>

                                            <v-select
                                                    outline
                                                    v-model="genreList"
                                                    :items="genres"
                                                    :menu-props="{ maxHeight: '400' }"
                                                    label="Жанры"
                                                    multiple
                                                    hint="Выберите жанры"
                                                    persistent-hint
                                            ></v-select>

                                            <v-select
                                                    outline
                                                    label="Категории"
                                                    :items="categoryList"
                                                    v-model="categoryName">
                                            </v-select>

                                            <v-layout>
                                                <v-card v-if="readyFile">
                                                    <v-card-actions>
                                                        <span @click="openLink(readyFile)" class="cursor"> {{ readyFile }}</span>
                                                        <v-spacer></v-spacer>
                                                        <v-icon @click="deleteImg()">cancel</v-icon>
                                                    </v-card-actions>

                                                </v-card>
                                            </v-layout>


                                            <file-upload btn-label="Загрузить" :url="url" @success="onSuccess" @change="onFileChange">{{success}}</file-upload>

                                            <v-container>
                                                <v-layout justify-center row >
                                                    <v-btn color="info" @click="onSubmit">Отправить</v-btn>
                                                </v-layout>
                                            </v-container>

                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-form>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "addBook",
        data() {
            return {
                currentFile: {},
                readyFile: undefined,
                filesUploaded: [],
                url: 'http://localhost:5000/uploadPhoto', //Url куда будем грузить фотку
                success: false,
                title: '',
                about: '',
                author: '',
                price: '',
                genreList: [],
                genres: ["Роман", "Научная фантастика", "Социальная фантастика", "Фантастика", "Антиутопическая литература",
                    "Военная проза", "Исторический жанр", "Сатира", "Оккультная литетартура", "Философия", "Сказка", "Учебник"],
                categoryName: '',
                // categoryList: [],
                loginRules: [
                    v => !!v || 'Пустое поле',
                ],
            }
        },

        computed: {
            categoryList() {
                let list = this.$store.getters.categoryList;
                console.log(list)
                let arr = [];
                list.forEach(element => {
                    arr.push(element.title)
                })
                return arr
            }
        },

        created() {
            console.log(this.categoryList)
            this.$store.dispatch('fetchCategories')
        },

        methods: {

            //Как только выбрали новую картинку
            onFileChange(file) {
                this.filesUploaded = file;
                this.currentFile = file;
                console.log('message: ', file.message)
            },
            //Успешная загрузка фотки на сервер
            onSuccess() {
                this.success = true;
                this.readyFile = this.currentFile.message;
                console.log(this.currentFile.message)
            },

            //Открытие картинки в новой кладке
            openLink(url) {
                window.open(url, '_blank')
            },

            //Удаление картинки по ее индексу
            deleteImg() {
                this.readyFile = undefined;
            },

            onSubmit() {
                axios.post('http://localhost:5000/mainPost', {
                    router: 'addBook',
                    token: JSON.parse(localStorage.getItem('user')).token,
                    title: this.title,
                    author: this.author,
                    about: this.about,
                    price: this.price,
                    genreList: this.genreList,
                    categoryName: this.categoryName,
                    photo: this.readyFile
                }).then(response => {
                    this.$store.dispatch('fetchBooks')
                    this.$router.push('/admin/products')
                }).catch(e => console.log(e.response.data.error))
            }
        }
    }
</script>

<style scoped>
.cursor{
    cursor: pointer;
}
</style>