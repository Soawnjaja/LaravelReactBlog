<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            ['title' => 'Первая статья', 'content' => 'Контент первой статьи'],
            ['title' => 'Вторая статья', 'content' => 'Контент второй статьи'],
            ['title' => 'Третья статья', 'content' => 'Контент третьей статьи'],
        ];

        foreach ($articles as $data) {
            Article::create($data);
        }
    }
}
