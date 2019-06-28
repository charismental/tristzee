<template>
    <div id="score-card">
        <table>
            <tr>
                <th colspan="2">Upper</th>
                <th colspan="2">Lower</th>
            </tr>
            <tr>
                <td>one</td>
                <td></td>
                <td>3x</td>
                <td></td>
            </tr>
            <tr>
                <td>two</td>
                <td></td>
                <td>4x</td>
                <td></td>
            </tr>
            <tr>
                <td>three</td>
                <td></td>
                <td>full</td>
                <td></td>
            </tr>
            <tr>
                <td>four</td>
                <td></td>
                <td>small</td>
                <td></td>
            </tr>
            <tr>
                <td>five</td>
                <td></td>
                <td>large</td>
                <td></td>
            </tr>
            <tr>
                <td>six</td>
                <td></td>
                <td>yahtzee</td>
                <td></td>
            </tr>
            <tr>
                <td>bonus</td>
                <td></td>
                <td>chance</td>
                <td></td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {

}
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {background-color: lightgreen;}
</style>
