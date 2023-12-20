<script setup>
import { useRoute } from 'vue-router';
import { CHARACTERS, PLACES, WEAPONS } from "../utils/table/Classic";
import { ref } from 'vue';
import Item from "../components/Gotham/Item.vue";
import Row from '../components/Table/Row.vue';

const route = useRoute();
const { type, id } = route.params;
console.log(type, id);
const isClassicGame = type === 'classic';

const itemsChecked = ref(JSON.parse(window.localStorage.getItem('clue-table')) || {
    'characters': [],
    'weapons': [],
    'places': []
});

const finalItems = JSON.parse(window.localStorage.getItem('clue-table-items'));

const murderer = ref(finalItems?.characters || '');
const murderWeapon = ref(finalItems?.weapons || '');
const murderPlace = ref(finalItems?.places || '');
</script>

<template>
    <main>
        <section v-if="isClassicGame">
            <p class="w-full sticky top-0 left-0 p-4 text-sm bg-white shadow z-10">
                Ha sido <Item>{{ murderer || '??' }}</Item> con <Item>{{ murderWeapon || '??' }}</Item> en <Item>{{
                    murderPlace || '??' }}
                </Item>
            </p>

            <div class="relative overflow-x-auto">
                <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr class="text-center">
                            <th></th>
                            <th>
                                Pistas
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-emerald-600">
                        <Row title="¿QUIÉN?" type="characters" :data="CHARACTERS" :items-checked="itemsChecked"
                            @on-final-item="value => murderer = value" />

                        <Row title="¿CON QUÉ ARMA?" type="weapons" :data="WEAPONS" :items-checked="itemsChecked"
                            @on-final-item="value => murderWeapon = value" />

                        <Row title="¿DÓNDE?" type="places" :data="PLACES" :items-checked="itemsChecked"
                            @on-final-item="value => murderPlace = value" />
                    </tbody>
                </table>
            </div>

        </section>
        <section v-else>
            <h1>Creating custom game</h1>
        </section>
    </main>
</template>