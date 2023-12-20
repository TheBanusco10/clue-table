<script setup>
import { computed, ref, watch } from 'vue';

const { data, type, itemsChecked } = defineProps({
    title: {
        type: String,
        default: 'Title'
    },
    data: {
        type: Array,
        default: []
    },
    type: {
        type: String,
        default: 'characters'
    },
    itemsChecked: {
        type: Object,
        default: {}
    }
})

const emits = defineEmits(['onFinalItem']);

const itemCompleted = ref('bg-emerald-600 text-white pointer-events-none');

const isItemFound = computed(() => getIsItemFound(type, data))
const finalItem = computed(() => isItemFound.value && getFinalItem(type, data));

const checkCell = (evt, type) => {
    const { checked, id } = evt.target;
    console.log(evt.target.checked, evt.target.id, type);

    const value = id.split('_')[1];
    const valueIndex = itemsChecked[type].indexOf(value);
    // If is check, store value
    if (checked) {
        if (valueIndex !== -1) return;
        itemsChecked[type].push(value);
    } else {
        // Remove value from array
        itemsChecked[type].splice(valueIndex, 1);
    }

    window.localStorage.setItem('clue-table', JSON.stringify(itemsChecked));
}

const getIsItemFound = (type, array) => {
    console.log(itemsChecked);
    return itemsChecked[type].length === array.length - 1;
}

const getFinalItem = (type, array) => {
    const finalItem = array.filter(x => !itemsChecked[type].includes(x))[0];
    const previousFinalItems = JSON.parse(window.localStorage.getItem('clue-table-items')) || {};
    console.log(previousFinalItems, finalItem);

    window.localStorage.setItem('clue-table-items', JSON.stringify(
        {
            ...previousFinalItems,
            [type]: finalItem
        }
    ));
    return finalItem;
}

watch(isItemFound, () => {
    emits('onFinalItem', finalItem.value);
});
</script>

<template>
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {{ title }}
        </th>
        <td v-for="(item) in 1" class="px-6 py-4">
        </td>
    </tr>
    <tr v-for="(item, index) in data" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" class="pl-2 transition" :class="[finalItem === item ? itemCompleted : '']">
            {{ item }}
        </th>
        <td v-for="(index) in 1" class="text-center relative px-6 py-4 hover:dark:bg-gray-700 transition"
            :class="[finalItem === item ? itemCompleted : '']">
            <label :for="`${type}_${item}_${index}`" class="absolute top-0 left-0 w-full h-full cursor-pointer"></label>
            <input :id="`${type}_${item}_${index}`" type="checkbox" @click="checkCell($event, type)"
                :disabled="finalItem === item" :checked="itemsChecked[type].includes(item)">
        </td>
    </tr>
</template>