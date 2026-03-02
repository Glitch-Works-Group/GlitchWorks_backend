

    if args.step == "download":
        datasets = load_all_datasets() if args.model == "all" else load_model_datasets(args.model)
        if not datasets:
            raise SystemExit(f"No datasets configured for model '{args.model}'.")
        download_datasets(datasets)
        return

    if args.model == "all":
        models = [
            "transaction_categorizer",
            "spending_forecaster",
            "budget_allocator",
            "goal_predictor",
            "anomaly_detector",
        ]
    else:
        models = [args.model]

    if args.step == "clean":
        for model in models:
            export_clean(model)
        return

    if args.step == "train":
        for model in models:
            train_models.DATASET_PATHS = train_models.resolve_dataset_paths()
            train_models.run_training(model)
        return


if __name__ == "__main__":
    main()
