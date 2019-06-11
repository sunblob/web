<template>
    <v-container fluid v-if="!loading">
        <v-layout align-center justify-center>
            <v-flex xs8 md8>
                <v-card>
                    <v-layout wrap justify-center>
                        <v-flex xs8 md8>
                            <v-card flat>
                                <v-card-title>
                                    ID: {{ book.hashId }}
                                </v-card-title>
                                <v-card-text>
                                    <v-form >
                                        <v-text-field
                                                outline
                                                v-model="title"
                                                name="title"
                                                label="Название"
                                                :rules="loginRules"
                                                type="text"></v-text-field>
                                        <v-text-field
                                                outline
                                                v-model="author"
                                                name="author"
                                                label="Автор"
                                                :rules="loginRules"
                                                type="text"></v-text-field>
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
                                                name="price"
                                                label="Цена"
                                                type="number"
                                                :rules="loginRules"
                                        ></v-text-field>
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
                                                value="kek"
                                                label="Категории"
                                                :items="categoryList"
                                                v-model="categoryName">
                                        </v-select>
                                    </v-form>
<!--                                    {{ genreList }}-->
<!--                                    {{ categoryName }}-->
                                    <v-card>
<!--                                        <v-img :src="book.image" height="100" contain>-->

<!--                                        </v-img>-->
                                        <v-card-text>
                                            <div>
                                                CurrentImage <br>
                                                <span>{{book.image}}</span>
                                            </div>

                                        </v-card-text>
                                    </v-card>

                                    <v-layout>
                                        <v-card v-if="readyFile">
                                            <v-card-text>
                                                New image:
                                            </v-card-text>
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
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
    <div v-else>
        <v-container>
            <v-layout row>
                <v-flex xs12 class="text-xs-center pt-5">
                    <v-progress-circular indeterminate :size="70" :width="7" color="primary">

                    </v-progress-circular>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "EditBook",
        data() {
            return {
                currentFile: {},
                readyFile: undefined,
                filesUploaded: [],
                url: 'http://localhost:5000/uploadPhoto', //Url куда будем грузить фотку
                success: false,
                title: '',
                author: '',
                about: '',
                price: '',
                genreList: [],
                genres: ["Роман", "Научная фантастика", "Социальная фантастика", "Фантастика", "Антиутопическая литература",
                    "Военная проза", "Исторический жанр", "Сатира", "Оккультная литетартура", "Философия", "Сказка", "Учебник"],
                categoryName: '',
                loginRules: [
                    v => !!v || 'Пустое поле',
                ],
            }
        },
        computed: {
            book() {
                return this.$store.getters.bookById(this.$route.params.hashId);

            },
            loading() {
                return this.$store.getters.loading
            },
            categoryList() {
                let list = this.$store.getters.categoryList;
                console.log(list);
                let arr = [];
                list.forEach(element => {
                    arr.push(element.title);
                    if (this.book && this.book.categoryId === element.hashId) {
                        this.categoryName = element.title
                    }
                });


                return arr
            }
        },
        methods: {
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
                    hashId: this.book.hashId,
                    title: this.title,
                    author: this.author,
                    about: this.about,
                    price: this.price,
                    genreList: this.genreList,
                    categoryName: this.categoryName,
                    photo: this.readyFile
                }).then(response => {
                    this.$store.dispatch('fetchBooks');
                    this.$router.push('/admin/products')
                }).catch(e => console.log(e.response.data.error))
            }
        },
        async created() {
            await this.$store.dispatch('fetchBooks');
            console.log('got:', this.book);
            await this.$store.dispatch('fetchCategories');
            this.$nextTick(() => {
                this.title = this.book.title;
                this.author = this.book.author;
                this.about = this.book.about;
                this.genreList = Object.values(this.book.genreList);
                this.price = this.book.price;
                this.readyFile = this.book.image;
                this.categoryName = this.book.categoryName
            })
        },
        //  mounted() {
        //     console.log('mounted');
        //     this.title = this.book.title;
        //     this.author = this.book.author;
        //     this.about = this.book.about;
        //     this.genreList = Object.values(this.book.genreList);
        //     this.price = this.book.price;
        //     this.readyFile = this.book.image;
        //     this.categoryName = this.book.categoryName
        // }
    }
</script>

<style scoped>

</style>