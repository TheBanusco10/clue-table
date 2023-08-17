<script setup>
import { useRoute } from 'vue-router';
import { CHARACTERS } from "../utils/table/Classic";

const route = useRoute();
const { type, id } = route.params;
console.log(type, id);
const isClassicGame = type === 'classic';

const numPlayers = 3;

const checkCell = (evt) => {
    console.log(evt.target.checked, evt.target.id);
}
</script>

<template>
    <main>
        <section v-if="isClassicGame">
            <h1>Creating table {{ type }}</h1>

            <div class="relative overflow-x-auto">
                <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th>JUGADORES</th>
                            <th v-for="(item) in numPlayers">
                                Player {{ item }}
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-emerald-600">
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ¿QUIÉN?
                            </th>
                            <td v-for="(item) in numPlayers" class="px-6 py-4">
                            </td>
                        </tr>
                        <tr v-for="(character, index) in CHARACTERS"
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row">
                                {{ character }}
                            </th>
                            <td v-for="(item) in numPlayers" class="relative px-6 py-4">
                                <label :for="`character_check_${character}_${item}`"
                                    class="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
                                <input :id="`character_check_${character}_${item}`" type="checkbox" @click="checkCell">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </section>
        <section v-else>
            <h1>Creating custom game</h1>
        </section>
    </main>
</template>